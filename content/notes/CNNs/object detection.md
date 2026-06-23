---
title: Object Detection
enableToc: "true"
order: "19"
---
Suppose we want to build a car detection algorithm. We can create a label training set, so x and y with closely cropped examples of cars. Using such images we train a ConvNet which gives output y which is zero or one depending if there is a car or not. 

### Sliding windows detection. 
Suppose we have a image with a car in it. Instead of giving the full image as input to the `ConvNet`, we take a window of  certain size and start from the top left corner. We give this window to the `ConvNet`, to give output. Then we shift the window towards the right and so on till we have slid the window across every position in the image. 

So now we repeat the process by taking a slightly larger window and then again we a more large window. The purpose of this is that when the windows passes through a car, the `ConvNet` would detect it and mark as 1. 

The disadvantage of this method is the computational cost of going through the different square regions in the image and running each of them through a `ConvNet`.  To make this algorithm more efficient we implement it 

In a normal network in order get the output we use fully connected layers and then a final softmax layer to give the output. Instead of using a fully connected layer, we use convolution layer and convert the image into size `1 x 1 x k`, where `k` is the number of filters used. 

![[Pasted image 20260622175107.png]]

The above picture shows our `ConvNet`. Now suppose out test net has image of size `16 x 16 x 3`. What we can do is pass this image in the same network as above. When we do this we get a image with dimensions `2 x 2 x 4`. All the element in this image are the result we get by using the sliding window algorithm. 

This convolutional implementation is computationally efficient, but it still is not accurate in outputting the bounding boxes. So get more accurate boxes one method is to use the [[yolo algorithm | YOLO algorithm]]. 