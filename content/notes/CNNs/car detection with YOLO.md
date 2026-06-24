---
title: Car Detection with YOLO
enableToc: "true"
order: "25"
---
We start my importing the required packages. 
```python
import argparse
import os
import matplotlib.pyplot as plt
from matplotlib.pyplot import imshow
import scipy.io
import scipy.misc
import numpy as np
import pandas as pd
import PIL
from PIL import ImageFont, ImageDraw, Image
import tensorflow as tf
from tensorflow.python.framework.ops import EagerTensor

from tensorflow.keras.models import load_model
from yad2k.models.keras_yolo import yolo_head
from yad2k.utils.utils import draw_boxes, get_colors_for_classes, scale_boxes, read_classes, read_anchors, preprocess_image

%matplotlib inline
```
We are working on a self-driving car. The input is a batch of images, and each image has the shape `(608, 608, 3)`. The output we require is a list of bounding boxes along with the recognized classes. Each bounding box is represented by 6 numbers $(p_c, b_x, b_y, b_h, b_w, c)$ as explained above. $c$ is the class vector and is an 80-dimensional vector, since we are going to detect 80 classes. So for each bounding box 85 numbers are required to define it. 

For this work, 5 anchor boxes are chosen. The architecture of our algorithm will look like this :
$$
\text{IMAGE(m, 608, 608, 3)} \longrightarrow \text{DEEP CNN} \longrightarrow \text{ENCODING(m, 19, 19, 5, 85)}
$$
This means that we are using a `19 x 19` grid and if the center of an object falls into a grid cell, the grid cell is responsible for detecting the object. 

Now, for each box (of each cell) we compute the following element wise product and extract a probability that the box contains a certain class. The class score is 
$$
\text{score}_{c, i} = p_c \times c_i
$$
where $p_c$ is the probability that there is an object times the probability the the object is a certain class $c_i$. We choose the class which has the highest probability. 

### Filtering bounding boxes
We want to get rid of box for which the class score is less than a chosen threshold. The models gives us a total of `19 x 19 x 5 x 85` numbers, with each box described by 85 numbers. We arrange the output tensor into the following variables :
- `box_confidence`: tensor of shape (19,19,5,1) containing $p_c$ (confidence probability that there's some object) for each of the 5 boxes predicted in each of the `19x19` cells
- `boxes`: tensor of shape (19,19,5,4) containing the midpoint and dimensions $(b_x,b_y,b_h,b_w)$ for each of the 5 boxes in each cell.
- `box_class_probs`: tensor of shape (19,19,5,80) containing the "class probabilities" $(c_1,c_2,...c_{80})$ for each of the 80 classes for each of the 5 boxes per cell.

```python 
def yolo_filter_boxes(boxes, box_confidence, box_class_probs, threshold = .6):
    """Filters YOLO boxes by thresholding on object and class confidence.
    
    Arguments:
        boxes -- tensor of shape (19, 19, 5, 4)
        box_confidence -- tensor of shape (19, 19, 5, 1)
        box_class_probs -- tensor of shape (19, 19, 5, 80)
        threshold -- real value, if [ highest class probability score < threshold],
                     then get rid of the corresponding box

    Returns:
        scores -- tensor of shape (None,), containing the class probability score for selected boxes
        boxes -- tensor of shape (None, 4), containing (b_x, b_y, b_h, b_w) coordinates of selected boxes
        classes -- tensor of shape (None,), containing the index of the class detected by the selected boxes
    """
    
    box_scores = box_confidence*box_class_probs
    box_classes = tf.math.argmax(box_scores, axis=-1)
    box_class_scores = tf.math.reduce_max(box_scores, axis=-1)
    
    filtering_mask =  box_class_scores >= threshold
    
    scores = tf.boolean_mask(box_class_scores, filtering_mask)
    boxes = tf.boolean_mask(boxes, filtering_mask)
    classes = tf.boolean_mask(box_classes, filtering_mask)
    
    return scores, boxes, classes
```

### Non-max Suppression 
Even after filtering by thresholding over the class scores, we still end up with a lot of overlapping boxes. A second filter for selecting the right boxes is called non-maximum suppression. 

Non-max suppression uses the very important function called **"Intersection over Union"**, or `IoU`.

A box is defined using its two corners: upper left $(x_1, y_1)$ and lower right $(x_2,y_2)$, instead of using the midpoint, height and width. This makes it a bit easier to calculate the intersection.

```python
def iou(box1, box2):
    """Implement the intersection over union (IoU) between box1 and box2
    
    Arguments:
    box1 -- first box, list object with coordinates (box1_x1, box1_y1, box1_x2, box_1_y2)
    box2 -- second box, list object with coordinates (box2_x1, box2_y1, box2_x2, box2_y2)
    """


    (box1_x1, box1_y1, box1_x2, box1_y2) = box1
    (box2_x1, box2_y1, box2_x2, box2_y2) = box2

    xi1 = max(box1_x1, box2_x1)
    yi1 = max(box1_y1, box2_y1)
    xi2 = min(box1_x2, box2_x2)
    yi2 = min(box1_y2, box2_y2)
    inter_width = max(xi2 - xi1, 0)
    inter_height =  max(yi2 - yi1, 0)
    inter_area = inter_width*inter_height

    box1_area = (box1_x2 - box1_x1)*(box1_y2 - box1_y1)
    box2_area = (box2_x2 - box2_x1)*(box2_y2 - box2_y1)
    union_area = box1_area + box2_area - inter_area
    
    iou = inter_area/union_area    
    return iou
```

TensorFlow has two built-in functions that are used to implement non-max suppression (so you don't actually need to use your `iou()` implementation):
```
tf.image.non_max_suppression(
  boxes, scores, max_output_size, iou_threshold=0.5,
  score_threshold=float('-inf'), name=None)
```
Here is how we implement non-max suppression :
```python
def yolo_non_max_suppression(scores, boxes, classes, max_boxes = 10, iou_threshold = 0.5):
    """
    Applies Non-max suppression (NMS) to set of boxes
    
    Arguments:
    scores -- tensor of shape (None,), output of yolo_filter_boxes()
    boxes -- tensor of shape (None, 4), output of yolo_filter_boxes() that have been scaled to the image size (see later)
    classes -- tensor of shape (None,), output of yolo_filter_boxes()
    max_boxes -- integer, maximum number of predicted boxes you'd like
    iou_threshold -- real value, "intersection over union" threshold used for NMS filtering
    
    Returns:
    scores -- tensor of shape (None, ), predicted score for each box
    boxes -- tensor of shape (None, 4), predicted box coordinates
    classes -- tensor of shape (None, ), predicted class for each box
    """
    boxes = tf.cast(boxes, dtype=tf.float32)
    scores = tf.cast(scores, dtype=tf.float32)

    nms_indices = []
    classes_labels = tf.unique(classes)[0] # Get unique classes
    
    for label in classes_labels:
        filtering_mask = classes == label
    
        boxes_label = tf.boolean_mask(boxes, filtering_mask)
        scores_label = tf.boolean_mask(scores, filtering_mask)
        
        if tf.shape(scores_label)[0] > 0:  
            nms_indices_label = tf.image.non_max_suppression(
                    boxes_label,
                    scores_label,
                    max_output_size = max_boxes,
                    iou_threshold=iou_threshold) 

            selected_indices = tf.squeeze(tf.where(filtering_mask), axis=1)
            
            nms_indices.append(tf.gather(selected_indices, nms_indices_label))

    nms_indices = tf.concat(nms_indices, axis = 0, name='concat')
    
    scores = tf.gather(scores, nms_indices)
    boxes = tf.gather(boxes, nms_indices)
    classes = tf.gather(classes, nms_indices)
    
    sort_order = tf.argsort(scores, direction='DESCENDING').numpy()
    scores = tf.gather(scores, sort_order[0:max_boxes])
    boxes = tf.gather(boxes, sort_order[0:max_boxes])
    classes = tf.gather(classes, sort_order[0:max_boxes])

    return scores, boxes, classes
```

### `yolo_eval()`
It's time to implement a function taking the output of the deep CNN (the `19x19x5x85` dimensional encoding) and filtering through all the boxes using the functions we have just implemented.

There're a few ways of representing boxes, such as via their corners or via their midpoint and height/width. YOLO converts between a few such formats at different times, using the following functions:
```python 
def yolo_boxes_to_corners(box_xy, box_wh):
    """Convert YOLO box predictions to bounding box corners."""
    box_mins = box_xy - (box_wh / 2.)
    box_maxes = box_xy + (box_wh / 2.)

    return tf.keras.backend.concatenate([
        box_mins[..., 1:2],  
        box_mins[..., 0:1],  
        box_maxes[..., 1:2],  
        box_maxes[..., 0:1]  
    ])
```

```python
def yolo_eval(yolo_outputs, image_shape = (720, 1280), max_boxes=10, score_threshold=.6, iou_threshold=.5):
    """
    Converts the output of YOLO encoding (a lot of boxes) to your predicted boxes along with their scores, box coordinates and classes.
    
    Arguments:
    yolo_outputs -- output of the encoding model (for image_shape of (608, 608, 3)), contains 4 tensors:
                    box_xy: tensor of shape (None, 19, 19, 5, 2)
                    box_wh: tensor of shape (None, 19, 19, 5, 2)
                    box_confidence: tensor of shape (None, 19, 19, 5, 1)
                    box_class_probs: tensor of shape (None, 19, 19, 5, 80)
    image_shape -- tensor of shape (2,) containing the input shape, in this notebook we use (608., 608.) (has to be float32 dtype)
    max_boxes -- integer, maximum number of predicted boxes you'd like
    score_threshold -- real value, if [ highest class probability score < threshold], then get rid of the corresponding box
    iou_threshold -- real value, "intersection over union" threshold used for NMS filtering
    
    Returns:
    scores -- tensor of shape (None, ), predicted score for each box
    boxes -- tensor of shape (None, 4), predicted box coordinates
    classes -- tensor of shape (None,), predicted class for each box
    """
    
    box_xy, box_wh, box_confidence, box_class_probs = yolo_outputs
    boxes = yolo_boxes_to_corners(box_xy, box_wh)
    
    scores, boxes, classes = yolo_filter_boxes(boxes, 
                                  box_confidence, 
                                  box_class_probs,
                                  score_threshold 
                                 )
    
    # Scale boxes back to original image shape. YOLO's network was trained to run on 608x608 images. 
    # If you are testing this data on a different size image -- for example, the car 
    # detection dataset had 720x1280 images --
    # this step rescales the boxes so that they can be plotted on top of the original 720x1280 image.
    boxes = scale_boxes(boxes, image_shape)
    
    scores, boxes, classes = yolo_non_max_suppression(scores, 
                                  boxes, 
                                  classes, 
                                  max_boxes, 
                                  iou_threshold 
                                 )
    
    return scores, boxes, classes
```
### Testing the Pre-trained Model
We will load the model
```python
yolo_model = load_model("model_data/", compile=False)
yolo_model.summary()
```
This gives output :
```
Model: "functional_1"
__________________________________________________________________________________________________
Layer (type)                    Output Shape         Param #     Connected to                     
==================================================================================================
input_1 (InputLayer)            [(None, 608, 608, 3) 0                                            
__________________________________________________________________________________________________
conv2d (Conv2D)                 (None, 608, 608, 32) 864         input_1[0][0]                    
__________________________________________________________________________________________________
batch_normalization (BatchNorma (None, 608, 608, 32) 128         conv2d[0][0]                     
__________________________________________________________________________________________________
leaky_re_lu (LeakyReLU)         (None, 608, 608, 32) 0           batch_normalization[0][0]        
__________________________________________________________________________________________________
max_pooling2d (MaxPooling2D)    (None, 304, 304, 32) 0           leaky_re_lu[0][0]                
__________________________________________________________________________________________________
conv2d_1 (Conv2D)               (None, 304, 304, 64) 18432       max_pooling2d[0][0]              
__________________________________________________________________________________________________
batch_normalization_1 (BatchNor (None, 304, 304, 64) 256         conv2d_1[0][0]                   
__________________________________________________________________________________________________
leaky_re_lu_1 (LeakyReLU)       (None, 304, 304, 64) 0           batch_normalization_1[0][0]      
__________________________________________________________________________________________________
max_pooling2d_1 (MaxPooling2D)  (None, 152, 152, 64) 0           leaky_re_lu_1[0][0]              
__________________________________________________________________________________________________
conv2d_2 (Conv2D)               (None, 152, 152, 128 73728       max_pooling2d_1[0][0]            
__________________________________________________________________________________________________
batch_normalization_2 (BatchNor (None, 152, 152, 128 512         conv2d_2[0][0]                   
__________________________________________________________________________________________________
leaky_re_lu_2 (LeakyReLU)       (None, 152, 152, 128 0           batch_normalization_2[0][0]      
__________________________________________________________________________________________________
conv2d_3 (Conv2D)               (None, 152, 152, 64) 8192        leaky_re_lu_2[0][0]              
__________________________________________________________________________________________________
batch_normalization_3 (BatchNor (None, 152, 152, 64) 256         conv2d_3[0][0]                   
__________________________________________________________________________________________________
leaky_re_lu_3 (LeakyReLU)       (None, 152, 152, 64) 0           batch_normalization_3[0][0]      
__________________________________________________________________________________________________
conv2d_4 (Conv2D)               (None, 152, 152, 128 73728       leaky_re_lu_3[0][0]              
__________________________________________________________________________________________________
batch_normalization_4 (BatchNor (None, 152, 152, 128 512         conv2d_4[0][0]                   
__________________________________________________________________________________________________
leaky_re_lu_4 (LeakyReLU)       (None, 152, 152, 128 0           batch_normalization_4[0][0]      
__________________________________________________________________________________________________
max_pooling2d_2 (MaxPooling2D)  (None, 76, 76, 128)  0           leaky_re_lu_4[0][0]              
__________________________________________________________________________________________________
conv2d_5 (Conv2D)               (None, 76, 76, 256)  294912      max_pooling2d_2[0][0]            
__________________________________________________________________________________________________
batch_normalization_5 (BatchNor (None, 76, 76, 256)  1024        conv2d_5[0][0]                   
__________________________________________________________________________________________________
leaky_re_lu_5 (LeakyReLU)       (None, 76, 76, 256)  0           batch_normalization_5[0][0]      
__________________________________________________________________________________________________
conv2d_6 (Conv2D)               (None, 76, 76, 128)  32768       leaky_re_lu_5[0][0]              
__________________________________________________________________________________________________
batch_normalization_6 (BatchNor (None, 76, 76, 128)  512         conv2d_6[0][0]                   
__________________________________________________________________________________________________
leaky_re_lu_6 (LeakyReLU)       (None, 76, 76, 128)  0           batch_normalization_6[0][0]      
__________________________________________________________________________________________________
conv2d_7 (Conv2D)               (None, 76, 76, 256)  294912      leaky_re_lu_6[0][0]              
__________________________________________________________________________________________________
batch_normalization_7 (BatchNor (None, 76, 76, 256)  1024        conv2d_7[0][0]                   
__________________________________________________________________________________________________
leaky_re_lu_7 (LeakyReLU)       (None, 76, 76, 256)  0           batch_normalization_7[0][0]      
__________________________________________________________________________________________________
max_pooling2d_3 (MaxPooling2D)  (None, 38, 38, 256)  0           leaky_re_lu_7[0][0]              
__________________________________________________________________________________________________
conv2d_8 (Conv2D)               (None, 38, 38, 512)  1179648     max_pooling2d_3[0][0]            
__________________________________________________________________________________________________
batch_normalization_8 (BatchNor (None, 38, 38, 512)  2048        conv2d_8[0][0]                   
__________________________________________________________________________________________________
leaky_re_lu_8 (LeakyReLU)       (None, 38, 38, 512)  0           batch_normalization_8[0][0]      
__________________________________________________________________________________________________
conv2d_9 (Conv2D)               (None, 38, 38, 256)  131072      leaky_re_lu_8[0][0]              
__________________________________________________________________________________________________
batch_normalization_9 (BatchNor (None, 38, 38, 256)  1024        conv2d_9[0][0]                   
__________________________________________________________________________________________________
leaky_re_lu_9 (LeakyReLU)       (None, 38, 38, 256)  0           batch_normalization_9[0][0]      
__________________________________________________________________________________________________
conv2d_10 (Conv2D)              (None, 38, 38, 512)  1179648     leaky_re_lu_9[0][0]              
__________________________________________________________________________________________________
batch_normalization_10 (BatchNo (None, 38, 38, 512)  2048        conv2d_10[0][0]                  
__________________________________________________________________________________________________
leaky_re_lu_10 (LeakyReLU)      (None, 38, 38, 512)  0           batch_normalization_10[0][0]     
__________________________________________________________________________________________________
conv2d_11 (Conv2D)              (None, 38, 38, 256)  131072      leaky_re_lu_10[0][0]             
__________________________________________________________________________________________________
batch_normalization_11 (BatchNo (None, 38, 38, 256)  1024        conv2d_11[0][0]                  
__________________________________________________________________________________________________
leaky_re_lu_11 (LeakyReLU)      (None, 38, 38, 256)  0           batch_normalization_11[0][0]     
__________________________________________________________________________________________________
conv2d_12 (Conv2D)              (None, 38, 38, 512)  1179648     leaky_re_lu_11[0][0]             
__________________________________________________________________________________________________
batch_normalization_12 (BatchNo (None, 38, 38, 512)  2048        conv2d_12[0][0]                  
__________________________________________________________________________________________________
leaky_re_lu_12 (LeakyReLU)      (None, 38, 38, 512)  0           batch_normalization_12[0][0]     
__________________________________________________________________________________________________
max_pooling2d_4 (MaxPooling2D)  (None, 19, 19, 512)  0           leaky_re_lu_12[0][0]             
__________________________________________________________________________________________________
conv2d_13 (Conv2D)              (None, 19, 19, 1024) 4718592     max_pooling2d_4[0][0]            
__________________________________________________________________________________________________
batch_normalization_13 (BatchNo (None, 19, 19, 1024) 4096        conv2d_13[0][0]                  
__________________________________________________________________________________________________
leaky_re_lu_13 (LeakyReLU)      (None, 19, 19, 1024) 0           batch_normalization_13[0][0]     
__________________________________________________________________________________________________
conv2d_14 (Conv2D)              (None, 19, 19, 512)  524288      leaky_re_lu_13[0][0]             
__________________________________________________________________________________________________
batch_normalization_14 (BatchNo (None, 19, 19, 512)  2048        conv2d_14[0][0]                  
__________________________________________________________________________________________________
leaky_re_lu_14 (LeakyReLU)      (None, 19, 19, 512)  0           batch_normalization_14[0][0]     
__________________________________________________________________________________________________
conv2d_15 (Conv2D)              (None, 19, 19, 1024) 4718592     leaky_re_lu_14[0][0]             
__________________________________________________________________________________________________
batch_normalization_15 (BatchNo (None, 19, 19, 1024) 4096        conv2d_15[0][0]                  
__________________________________________________________________________________________________
leaky_re_lu_15 (LeakyReLU)      (None, 19, 19, 1024) 0           batch_normalization_15[0][0]     
__________________________________________________________________________________________________
conv2d_16 (Conv2D)              (None, 19, 19, 512)  524288      leaky_re_lu_15[0][0]             
__________________________________________________________________________________________________
batch_normalization_16 (BatchNo (None, 19, 19, 512)  2048        conv2d_16[0][0]                  
__________________________________________________________________________________________________
leaky_re_lu_16 (LeakyReLU)      (None, 19, 19, 512)  0           batch_normalization_16[0][0]     
__________________________________________________________________________________________________
conv2d_17 (Conv2D)              (None, 19, 19, 1024) 4718592     leaky_re_lu_16[0][0]             
__________________________________________________________________________________________________
batch_normalization_17 (BatchNo (None, 19, 19, 1024) 4096        conv2d_17[0][0]                  
__________________________________________________________________________________________________
leaky_re_lu_17 (LeakyReLU)      (None, 19, 19, 1024) 0           batch_normalization_17[0][0]     
__________________________________________________________________________________________________
conv2d_18 (Conv2D)              (None, 19, 19, 1024) 9437184     leaky_re_lu_17[0][0]             
__________________________________________________________________________________________________
batch_normalization_18 (BatchNo (None, 19, 19, 1024) 4096        conv2d_18[0][0]                  
__________________________________________________________________________________________________
conv2d_20 (Conv2D)              (None, 38, 38, 64)   32768       leaky_re_lu_12[0][0]             
__________________________________________________________________________________________________
leaky_re_lu_18 (LeakyReLU)      (None, 19, 19, 1024) 0           batch_normalization_18[0][0]     
__________________________________________________________________________________________________
batch_normalization_20 (BatchNo (None, 38, 38, 64)   256         conv2d_20[0][0]                  
__________________________________________________________________________________________________
conv2d_19 (Conv2D)              (None, 19, 19, 1024) 9437184     leaky_re_lu_18[0][0]             
__________________________________________________________________________________________________
leaky_re_lu_20 (LeakyReLU)      (None, 38, 38, 64)   0           batch_normalization_20[0][0]     
__________________________________________________________________________________________________
batch_normalization_19 (BatchNo (None, 19, 19, 1024) 4096        conv2d_19[0][0]                  
__________________________________________________________________________________________________
space_to_depth_x2 (Lambda)      (None, 19, 19, 256)  0           leaky_re_lu_20[0][0]             
__________________________________________________________________________________________________
leaky_re_lu_19 (LeakyReLU)      (None, 19, 19, 1024) 0           batch_normalization_19[0][0]     
__________________________________________________________________________________________________
concatenate (Concatenate)       (None, 19, 19, 1280) 0           space_to_depth_x2[0][0]          
                                                                 leaky_re_lu_19[0][0]             
__________________________________________________________________________________________________
conv2d_21 (Conv2D)              (None, 19, 19, 1024) 11796480    concatenate[0][0]                
__________________________________________________________________________________________________
batch_normalization_21 (BatchNo (None, 19, 19, 1024) 4096        conv2d_21[0][0]                  
__________________________________________________________________________________________________
leaky_re_lu_21 (LeakyReLU)      (None, 19, 19, 1024) 0           batch_normalization_21[0][0]     
__________________________________________________________________________________________________
conv2d_22 (Conv2D)              (None, 19, 19, 425)  435625      leaky_re_lu_21[0][0]             
==================================================================================================
Total params: 50,983,561
Trainable params: 50,962,889
Non-trainable params: 20,672
__________________________________________________________________________________________________
```

```python
def predict(image_file):
    """
    Runs the graph to predict boxes for "image_file". Prints and plots the predictions.
    
    Arguments:
    image_file -- name of an image stored in the "images" folder.
    
    Returns:
    out_scores -- tensor of shape (None, ), scores of the predicted boxes
    out_boxes -- tensor of shape (None, 4), coordinates of the predicted boxes
    out_classes -- tensor of shape (None, ), class index of the predicted boxes
    
    Note: "None" actually represents the number of predicted boxes, it varies between 0 and max_boxes. 
    """

    image, image_data = preprocess_image("images/" + image_file, model_image_size = (608, 608))
    
    yolo_model_outputs = yolo_model(image_data)
    yolo_outputs = yolo_head(yolo_model_outputs, anchors, len(class_names))
    
    out_scores, out_boxes, out_classes = yolo_eval(yolo_outputs, [image.size[1],  image.size[0]], 10, 0.3, 0.5)

    print('Found {} boxes for {}'.format(len(out_boxes), "images/" + image_file))
    colors = get_colors_for_classes(len(class_names))
    draw_boxes(image, out_boxes, out_classes, class_names, out_scores)
    image.save(os.path.join("out", image_file), quality=100)
    output_image = Image.open(os.path.join("out", image_file))
    imshow(output_image)

    return out_scores, out_boxes, out_classes
```

```python
out_scores, out_boxes, out_classes = predict("test.jpg")
```
This give output as follows :
```
Found 10 boxes for images/test.jpg
car 0.89 (367, 300) (745, 648)
car 0.80 (761, 282) (942, 412)
car 0.74 (159, 303) (346, 440)
car 0.70 (947, 324) (1280, 705)
bus 0.67 (5, 266) (220, 407)
car 0.66 (706, 279) (786, 350)
car 0.60 (925, 285) (1045, 374)
car 0.44 (336, 296) (378, 335)
car 0.37 (965, 273) (1022, 292)
traffic light 0.36 (681, 195) (692, 214)
```
![[Pasted image 20260624180723.png]]


