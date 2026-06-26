---
title: Generalization for 1D and 3D data
enableToc: "true"
---
### 1D data
Let us take am example. Suppose we have a electrocardioagram i.e. the variation of voltage across the check as out heart beats. Each peak corresponds to one heartbeat. We could convolve this data with a filter in one dimension. 

In a particular layer we can use multiple filters to have the output have multiple channels. All of the ideas of `2D` convolution apply to `1D` data.

### 3D data
3D data is a three dimensional input volume. Here is a example, if we take a `CT scan` which is a type of X-ray scan that gives a three dimensional model of your body. What a `CT scan` does is takes different slices through the body. 

So if we want to apply a `ConvNet` to detect features in this three dimensional `CT scan` then we can generalize the idea from 2D convolution. The same principles apply here also. 

If we have a input of size `14 x 14 x 14` and use filter of size `5 x 5 x 5` then we get a output of size `10 x 10 x 10`. If we use `16` such filters then the output has `16` channels.


