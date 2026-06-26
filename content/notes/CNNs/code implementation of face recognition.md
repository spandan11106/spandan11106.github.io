---
title: Code implementation of Face Recognition
enableToc: "true"
order: "30"
---
We will start by importing the required packages.
```python 
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, ZeroPadding2D, Activation, Input, concatenate
from tensorflow.keras.models import Model
from tensorflow.keras.layers import BatchNormalization
from tensorflow.keras.layers import MaxPooling2D, AveragePooling2D
from tensorflow.keras.layers import Concatenate
from tensorflow.keras.layers import Lambda, Flatten, Dense
from tensorflow.keras.initializers import glorot_uniform
from tensorflow.keras.layers import Layer
from tensorflow.keras import backend as K
K.set_image_data_format('channels_last')
import os
import numpy as np
from numpy import genfromtxt
import pandas as pd
import tensorflow as tf
import PIL

%matplotlib inline
%load_ext autoreload
%autoreload 2
```

## Encoding Face Images
The `FaceNet` model takes a lot of data and a long time to train. It is common practice to load weights someone else had already trained. The network architecture follows the Inception model from [Szegedy _et al_..](https://arxiv.org/abs/1409.4842) 

Key things to be aware of are :
- The network uses `160 x 160` dimensional `RGB` images as input. 
- The input images are originally of shape `96 x 96`, thus we need to scale them.
- The output is a matrix of shape (𝑚,128) that encodes each input face image into a 128-dimensional vector

We will load the weights :
```python
from tensorflow.keras.models import model_from_json

json_file = open('keras-facenet-h5/model.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
model = model_from_json(loaded_model_json)
model.load_weights('keras-facenet-h5/model.h5')
```
Since we are using a pre-trained model, we do not actually need to implement the triplet loss function but we will for the sake of completion. 
```python
def triplet_loss(y_true, y_pred, alpha=0.2):
    """
    Implementation of the triplet loss as defined by formula (3)

    Arguments:
    y_true -- true labels, required when you define a loss in Keras, you don't need it in this function.
    y_pred -- python list containing three objects:
            anchor -- the encodings for the anchor images, of shape (None, 128)
            positive -- the encodings for the positive images, of shape (None, 128)
            negative -- the encodings for the negative images, of shape (None, 128)

    Returns:
    loss -- real number, value of the loss
    """

    anchor, positive, negative = y_pred[0], y_pred[1], y_pred[2]

    pos_dist = tf.reduce_sum(tf.square(tf.subtract(anchor, positive)), axis=-1)

    neg_dist = tf.reduce_sum(tf.square(tf.subtract(anchor, negative)), axis=-1)

    basic_loss = tf.add(tf.subtract(pos_dist, neg_dist), alpha)

    loss = tf.reduce_sum(tf.maximum(basic_loss, 0.0))
 
    return loss
```
![[Pasted image 20260627013441.png | Example of distance outputs between three individual's encoding]]

So other useful functions which are used in application are implemented below. 

```python
def verify(image_path, identity, database, model):
    """
    Function that verifies if the person on the "image_path" image is "identity".
    
    Arguments:
        image_path -- path to an image
        identity -- string, name of the person you'd like to verify the identity. 
        Has to be an employee who works in the office.
        database -- python dictionary mapping names of allowed people's names (strings) to their encodings (vectors).
        model -- your Inception model instance in Keras
    
    Returns:
        dist -- distance between the image_path and the image of "identity" in the database.
        door_open -- True, if the door should open. False otherwise.
    """

    encoding = img_to_encoding(image_path, model)
    dist = np.linalg.norm(encoding - database[identity])

    if dist < 0.7:
        print("It's " + str(identity) + ", welcome in!")
        door_open = True
    else:
        print("It's not " + str(identity) + ", please go away")
        door_open = False

    return dist, door_open
```

```python
def who_is_it(image_path, database, model):
    """
    Implements face recognition for the office by finding who is the person on the image_path image.
    
    Arguments:
        image_path -- path to an image
        database -- database containing image encodings along with the name of the person on the image
        model -- your Inception model instance in Keras
    
    Returns:
        min_dist -- the minimum distance between image_path encoding and the encodings from the database
        identity -- string, the name prediction for the person on image_path
    """
    
    encoding = img_to_encoding(image_path, model) 
    min_dist = 100
    
    for (name, db_enc) in database.items():
        dist = np.linalg.norm(encoding - db_enc)

        if dist < min_dist:
            min_dist = dist
            identity = name
    
    if min_dist > 0.7:
        print("Not in the database.")
    else:
        print ("it's " + str(identity) + ", the distance is " + str(min_dist))
        
    return min_dist, identity
```


