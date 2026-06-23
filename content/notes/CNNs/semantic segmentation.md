---
title: Semantic Segmentation
enableToc: "true"
order: "22"
---
Semantic segmentation is used for precise object detection. This is specially useful in self-driving cars where we want to know the exact position of obstacles. It is also used in the medical industry to segregate organs from x-rays and mri scans. 

Let us take an example of segmenting out a car from a image. So we want pixels with the car to be labelled as 1 and rest of the pixels to be labelled as 0. We can also classify each object differently i.e. use 1 for car, 2 for buildings and 3 for the road. This could lead to classifying a lot of labels. 

In the algorithm, initially we have the same method of using convolution layers and pooling layers to decrease the height and width and increase the number of channels. After a certain point we again tend to increase the height and width and decrease the number of channels to get the segmented output. 

Now in order to increase the width and height we need to know how [[transpose convolution | Transpose Convolution ]] is done. 