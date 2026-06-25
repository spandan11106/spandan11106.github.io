---
title: Image Segmentation with U-Net
enableToc: "true"
order: "26"
---
We will start by importing the packages. 
```python 
import tensorflow as tf
import numpy as np

from tensorflow.keras.layers import Input
from tensorflow.keras.layers import Conv2D
from tensorflow.keras.layers import MaxPooling2D
from tensorflow.keras.layers import Dropout 
from tensorflow.keras.layers import Conv2DTranspose
from tensorflow.keras.layers import concatenate
```
Let us also load and split the data we have. 
```python 
import os
import numpy as np 
import pandas as pd 

import imageio

import matplotlib.pyplot as plt
%matplotlib inline

path = ''
image_path = os.path.join(path, './data/CameraRGB/')
mask_path = os.path.join(path, './data/CameraMask/')
image_list_orig = os.listdir(image_path)
image_list = [image_path+i for i in image_list_orig]
mask_list = [mask_path+i for i in image_list_orig]
```
We will split the dataset into unmasked and masked images. 
```python
image_list_ds = tf.data.Dataset.list_files(image_list, shuffle=False)
mask_list_ds = tf.data.Dataset.list_files(mask_list, shuffle=False)
```
```python 
image_filenames = tf.constant(image_list)
masks_filenames = tf.constant(mask_list)

dataset = tf.data.Dataset.from_tensor_slices((image_filenames, masks_filenames))
```
Normally we normalize the image values by dividing them by `225`. This sets them between `0` and `1`. However, using `tf.image.convert_image_dtype` with `tf.float32` sets them between `0` and `1` for us. 

```python
def process_path(image_path, mask_path):
    img = tf.io.read_file(image_path)
    img = tf.image.decode_png(img, channels=3)
    img = tf.image.convert_image_dtype(img, tf.float32)

    mask = tf.io.read_file(mask_path)
    mask = tf.image.decode_png(mask, channels=3)
    mask = tf.math.reduce_max(mask, axis=-1, keepdims=True)
    return img, mask

def preprocess(image, mask):
    input_image = tf.image.resize(image, (96, 128), method='nearest')
    input_mask = tf.image.resize(mask, (96, 128), method='nearest')

    return input_image, input_mask

image_ds = dataset.map(process_path)
processed_image_ds = image_ds.map(preprocess)
```
### U-Net
U-Net builds on a previous architecture called the Fully Convolutional Network, which replaces the dense layers found in a typical `CNN` with a transposed convolution layer that upsample the feature map back to the size of the original input image, while preserving the spatial information. 

While using transpose convolutions the input size no longer needs to be fixed, as it does when dense layers are used.

Unfortunately, the final feature layer of the FCN suffers from information loss due to downsampling too much. It then becomes difficult to upsample after so much information has been lost, causing an output that looks rough.

Instead of one transposed convolution at the end of the network, it uses a matching number of convolutions for downsampling the input image to a feature map, and transposed convolutions for upsampling those maps back up to the original input image size. It also adds skip connections, to retain information that would otherwise become lost during encoding. Skip connections send information to every upsampling layer in the decoder from the corresponding downsampling layer in the encoder, capturing finer information while also keeping computation low. These help prevent information loss, as well as model overfitting.

#### Encoder (Downsampling Block)
![[Pasted image 20260625223607.png]]
Each `conv_block()` is composed of 2 `Conv2D` layers with `ReLU` activation. We apply Dropout and Max-Pooling to some of this blocks. This function returns two tensors :
- `next_layer` : This will go into the next block
- `skip_connections` : This will go into the corresponding decoding block. 

```python
def conv_block(inputs=None, n_filters=32, dropout_prob=0, max_pooling=True):
    """
    Convolutional downsampling block
    
    Arguments:
        inputs -- Input tensor
        n_filters -- Number of filters for the convolutional layers
        dropout_prob -- Dropout probability
        max_pooling -- Use MaxPooling2D to reduce the spatial dimensions of the output volume
    Returns: 
        next_layer, skip_connection --  Next layer and skip connection outputs
    """

    conv = Conv2D(n_filters, 
                  (3, 3),   
                  activation='relu',
                  padding='same',
                  kernel_initializer='he_normal')(inputs)
                  
    conv = Conv2D(n_filters, 
                  (3, 3), 
                  activation='relu',
                  padding='same',
                  kernel_initializer='he_normal')(conv)
    
    if dropout_prob > 0:
        conv = Dropout(dropout_prob)(conv)
    
    if max_pooling:
        next_layer = MaxPooling2D((2, 2))(conv)
    else:
        next_layer = conv
        
    skip_connection = conv
    
    return next_layer, skip_connection
```

#### Decoder (Upsampling Block)
![[Pasted image 20260625223944.png]]
The decoder, or upsampling block, upsamples the features back to the original image size. At each upsampling level, you'll take the output of the corresponding encoder block and concatenate it before feeding to the next decoder block.

There are two new components in the decoder: `up` and `merge`. These are the transpose convolution and the skip connections. In addition, there are two more convolutional layers set to the same parameters as in the encoder.

```python 
def upsampling_block(expansive_input, contractive_input, n_filters=32):
    """
    Convolutional upsampling block
    
    Arguments:
        expansive_input -- Input tensor from previous layer
        contractive_input -- Input tensor from previous skip layer
        n_filters -- Number of filters for the convolutional layers
    Returns: 
        conv -- Tensor output
    """
    
    up = Conv2DTranspose(
                 n_filters,    
                 (3, 3),    
                 strides=(2, 2),
                 padding='same')(expansive_input)
    
    merge = concatenate([up, contractive_input], axis=3)
    conv = Conv2D(n_filters,   
                 (3, 3),    
                 activation='relu',
                 padding='same',
                 kernel_initializer='he_normal')(merge)
                 
    conv = Conv2D(n_filters,
                 (3, 3),   
                 activation='relu',
                 padding='same',
                 kernel_initializer='he_normal')(conv)
    
    return conv
```

#### Building the model
```python
def unet_model(input_size=(96, 128, 3), n_filters=32, n_classes=23):
    """
    Unet model
    
    Arguments:
        input_size -- Input shape 
        n_filters -- Number of filters for the convolutional layers
        n_classes -- Number of output classes
    Returns: 
        model -- tf.keras.Model
    """
    inputs = Input(input_size)

    cblock1 = conv_block(inputs, n_filters)
    cblock2 = conv_block(cblock1[0], 2*n_filters)
    cblock3 = conv_block(cblock2[0], 4*n_filters)
    cblock4 = conv_block(cblock3[0], 8*n_filters, dropout_prob=0.3)
    cblock5 = conv_block(cblock4[0], 16*n_filters, dropout_prob=0.3, max_pooling=False) 
    
    ublock6 = upsampling_block(cblock5[0], cblock4[1],  8*n_filters)
    ublock7 = upsampling_block(ublock6, cblock3[1],  4*n_filters)
    ublock8 = upsampling_block(ublock7, cblock2[1],  2*n_filters)
    ublock9 = upsampling_block(ublock8, cblock1[1], n_filters)
    
    conv9 = Conv2D(n_filters,
                 3,
                 activation='relu',
                 padding='same',
                 kernel_initializer='he_normal')(ublock9)

    conv10 = Conv2D(n_classes, 1, padding='same')(conv9)
    
    model = tf.keras.Model(inputs=inputs, outputs=conv10)

    return model
```
Now we set the model dimensions 
```python
img_height = 96
img_width = 128
num_channels = 3

unet = unet_model((img_height, img_width, num_channels))
unet.summary()
```
This gives output as follows :
```
Model: "model_7"
__________________________________________________________________________________________________
 Layer (type)                   Output Shape         Param #     Connected to                     
==================================================================================================
 input_15 (InputLayer)          [(None, 96, 128, 3)  0           []                               
                                ]                                                                 
                                                                                                  
 conv2d_83 (Conv2D)             (None, 96, 128, 32)  896         ['input_15[0][0]']               
                                                                                                  
 conv2d_84 (Conv2D)             (None, 96, 128, 32)  9248        ['conv2d_83[0][0]']              
                                                                                                  
 max_pooling2d_24 (MaxPooling2D  (None, 48, 64, 32)  0           ['conv2d_84[0][0]']              
 )                                                                                                
                                                                                                  
 conv2d_85 (Conv2D)             (None, 48, 64, 64)   18496       ['max_pooling2d_24[0][0]']       
                                                                                                  
 conv2d_86 (Conv2D)             (None, 48, 64, 64)   36928       ['conv2d_85[0][0]']              
                                                                                                  
 max_pooling2d_25 (MaxPooling2D  (None, 24, 32, 64)  0           ['conv2d_86[0][0]']              
 )                                                                                                
                                                                                                  
 conv2d_87 (Conv2D)             (None, 24, 32, 128)  73856       ['max_pooling2d_25[0][0]']       
                                                                                                  
 conv2d_88 (Conv2D)             (None, 24, 32, 128)  147584      ['conv2d_87[0][0]']              
                                                                                                  
 max_pooling2d_26 (MaxPooling2D  (None, 12, 16, 128)  0          ['conv2d_88[0][0]']              
 )                                                                                                
                                                                                                  
 conv2d_89 (Conv2D)             (None, 12, 16, 256)  295168      ['max_pooling2d_26[0][0]']       
                                                                                                  
 conv2d_90 (Conv2D)             (None, 12, 16, 256)  590080      ['conv2d_89[0][0]']              
                                                                                                  
 dropout_8 (Dropout)            (None, 12, 16, 256)  0           ['conv2d_90[0][0]']              
                                                                                                  
 max_pooling2d_27 (MaxPooling2D  (None, 6, 8, 256)   0           ['dropout_8[0][0]']              
 )                                                                                                
                                                                                                  
 conv2d_91 (Conv2D)             (None, 6, 8, 512)    1180160     ['max_pooling2d_27[0][0]']       
                                                                                                  
 conv2d_92 (Conv2D)             (None, 6, 8, 512)    2359808     ['conv2d_91[0][0]']              
                                                                                                  
 dropout_9 (Dropout)            (None, 6, 8, 512)    0           ['conv2d_92[0][0]']              
                                                                                                  
 conv2d_transpose_12 (Conv2DTra  (None, 12, 16, 256)  1179904    ['dropout_9[0][0]']              
 nspose)                                                                                          
                                                                                                  
 concatenate_12 (Concatenate)   (None, 12, 16, 512)  0           ['conv2d_transpose_12[0][0]',    
                                                                  'dropout_8[0][0]']              
                                                                                                  
 conv2d_93 (Conv2D)             (None, 12, 16, 256)  1179904     ['concatenate_12[0][0]']         
                                                                                                  
 conv2d_94 (Conv2D)             (None, 12, 16, 256)  590080      ['conv2d_93[0][0]']              
                                                                                                  
 conv2d_transpose_13 (Conv2DTra  (None, 24, 32, 128)  295040     ['conv2d_94[0][0]']              
 nspose)                                                                                          
                                                                                                  
 concatenate_13 (Concatenate)   (None, 24, 32, 256)  0           ['conv2d_transpose_13[0][0]',    
                                                                  'conv2d_88[0][0]']              
                                                                                                  
 conv2d_95 (Conv2D)             (None, 24, 32, 128)  295040      ['concatenate_13[0][0]']         
                                                                                                  
 conv2d_96 (Conv2D)             (None, 24, 32, 128)  147584      ['conv2d_95[0][0]']              
                                                                                                  
 conv2d_transpose_14 (Conv2DTra  (None, 48, 64, 64)  73792       ['conv2d_96[0][0]']              
 nspose)                                                                                          
                                                                                                  
 concatenate_14 (Concatenate)   (None, 48, 64, 128)  0           ['conv2d_transpose_14[0][0]',    
                                                                  'conv2d_86[0][0]']              
                                                                                                  
 conv2d_97 (Conv2D)             (None, 48, 64, 64)   73792       ['concatenate_14[0][0]']         
                                                                                                  
 conv2d_98 (Conv2D)             (None, 48, 64, 64)   36928       ['conv2d_97[0][0]']              
                                                                                                  
 conv2d_transpose_15 (Conv2DTra  (None, 96, 128, 32)  18464      ['conv2d_98[0][0]']              
 nspose)                                                                                          
                                                                                                  
 concatenate_15 (Concatenate)   (None, 96, 128, 64)  0           ['conv2d_transpose_15[0][0]',    
                                                                  'conv2d_84[0][0]']              
                                                                                                  
 conv2d_99 (Conv2D)             (None, 96, 128, 32)  18464       ['concatenate_15[0][0]']         
                                                                                                  
 conv2d_100 (Conv2D)            (None, 96, 128, 32)  9248        ['conv2d_99[0][0]']              
                                                                                                  
 conv2d_101 (Conv2D)            (None, 96, 128, 32)  9248        ['conv2d_100[0][0]']             

                                                                                                  
 conv2d_102 (Conv2D)            (None, 96, 128, 23)  759         ['conv2d_101[0][0]']             
                                                                                                  
==================================================================================================
Total params: 8,640,471
Trainable params: 8,640,471
Non-trainable params: 0
__________________________________________________________________________________________________
```
#### Loss Function
In semantic segmentation, we need as many mask as we have object classes. In the dataset we are using, each pixel in every mask has been assigned a single integer probability that it belongs to a certain class, from `0` to `num_classes - 1`. The correct layer is the layer with the higher probability. 

This is different from categorical crossentropy, where the labels should be one-hot encoded (just 0s and 1s). Here, you'll use sparse categorical crossentropy as your loss function, to perform pixel-wise multiclass prediction. Sparse categorical crossentropy is more efficient than other loss functions when you're dealing with lots of classes.

```python
unet.compile(optimizer='adam',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])
```

We train the model using the following hyper-parameters. 
```python 
EPOCHS = 5
VAL_SUBSPLITS = 5
BUFFER_SIZE = 500
BATCH_SIZE = 32
train_dataset = processed_image_ds.cache().shuffle(BUFFER_SIZE).batch(BATCH_SIZE)
print(processed_image_ds.element_spec)
model_history = unet.fit(train_dataset, epochs=EPOCHS)
```
This gives output :
```
(TensorSpec(shape=(96, 128, 3), dtype=tf.float32, name=None), TensorSpec(shape=(96, 128, 1), dtype=tf.uint8, name=None))
Epoch 1/5
34/34 [==============================] - 20s 206ms/step - loss: 1.8089 - accuracy: 0.4842

Epoch 2/5
34/34 [==============================] - 2s 64ms/step - loss: 0.7728 - accuracy: 0.8028

Epoch 3/5
34/34 [==============================] - 2s 64ms/step - loss: 0.5109 - accuracy: 0.8579

Epoch 4/5
34/34 [==============================] - 2s 65ms/step - loss: 0.4178 - accuracy: 0.8792

Epoch 5/5
34/34 [==============================] - 2s 65ms/step - loss: 0.3561 - accuracy: 0.8931
```
![[Pasted image 20260625231233.png]]
This is the prediction given my our model. 