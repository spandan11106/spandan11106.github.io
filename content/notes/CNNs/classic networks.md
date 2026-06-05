---
title: Classic Networks
enableToc: "true"
order: "11"
---
### `LeNet-5`
Here we look at the architecture of the `LeNet-5` neural network.

- We have our input image of size `32 x 32 x 1`. The neural network was trained on black and white images so the number of channels is only one. `LeNet-5` was used to recognize handwritten digits. 
- The first convolutional layer is used with `6` filters of size `5 x 5` and stride `s = 1`. The output of this layer is a `28 x 28 x 6` image.
- An average pooling layer is applied with `f = 2` and `s = 2`. This gives an image of size `14 x 14 x 6`. 
- In the second convolutional layer we use a set of `16` filters of size `5 x 5` ans stride `s = 1`. The output is a image of size `10 x 10 x 16`. 
- Again an average pooling layer is applied with `f = 2` and `s = 2`. This give an image of size `5 x 5 x 16`.
- The next layer is a fully fully connected layer with `120` neurons. So the `400` points images is densely connected to this layer.
- The layer with `120` neurons is then densely connected further to a layer with `84` neurons. This final layer with `84` features is then used to give the final output. 
- The output layer has `10` neurons each corresponding to the probability of the image being a particular digit. 

The original `LeNet-5` has a non-linearity after pooling.

### `AlexNet`
- `AlexNet` takes input image of size `227 x 227 x 3`.  
- The first layer takes `96` filters of size `11 x 11` with `s = 4`. This gives an output image of size `55 x 55 x 96`. 
- We apply max pooling with `f = 3` and `s = 2`. This gives an image of size `27 x 27 x 96`
- We then apply same convolution with `256` filters of size `5 x 5`   to get an output image of size `27 x 27 x 256`. 
- Again we apply max pooling with `f = 3` and `s = 2` to give an image of size `13 x 13 x 256`
- The third convolution layer is applied with `384` filters of size `3 x 3` to get an output image of size `13 x 13 x 384`.
- 4th convolution layer with `384` filters of size `3 x 3` to give output of size `13 x 13 x 384`.
- 5th convolution layer with `256` filters of size `3 x 3 ` to give out put of size `13 x 13 x 256`.
- Then max pooling with `f = 3` and `s = 2` gives image of size `6 x 6 x 256`.
- This layer is flattened into a vector having `9216` nodes. This is then densely connected to a fully connected layer having `4096` nodes which again to another `4096` neuron layer which is then connected to a softmax layer with `1000` neurons. 

`ReLU` activation function was used in this neural network.

### `VGG-16`
In this neural network we will be using convolution layers with filters of size `3 x 3` and `s = 1` with same convolution. All our max pooling layer would have `f = 2` and `s = 2`. 

- Input image of size `224 x 224 x 3` is used. 
- Then we go through two conv layers with `64` filters giving output of size `224 x 224 x 64`.
- Then we use a pooling layer giving output of size `112 x 112 x 64`.
- Then two conv layers with `128` filters giving output of size `112 x 112 x 128`.
- Then again we use a pooling layer to give output of size `56 x 56 x 128`.
- Then we use 3 conv layers with `256` filters, then a pooling layer giving output size `28 x 28 x 256`. 
- Then we use 3 conv layers with `512` filters, then a pooling layer giving output of size `14 x 14 x 512`. 
- Then we use 3 conv layers with `512` filters, then a pooling layer giving output of size `7 x 7 x 512`. 
- Then this goes to a `FC` layer with `4096` neurons which is then again connected densely to a  `4096` neuron layer which in the end is connected to a output softmax layer with `1000` neurons. 

