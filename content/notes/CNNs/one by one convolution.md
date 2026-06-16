---
title: 1x1 Convolutions
enableToc: "true"
order: "13"
---
### What does a `1x1` convolution do ?
Suppose we have a `3 x 3 x 1` dimension image and we apply a `1 x 1` filter to it, we get the following :
$$
\begin{bmatrix} 1 & 2 & 3 \\ 6 & 5 & 4 \\ 7 & 8 & 9 \end{bmatrix} * \begin{bmatrix} 2 \end{bmatrix} = \begin{bmatrix} 2 & 4 & 6 \\ 12 & 10 & 8 \\ 14 & 16 & 18 \end{bmatrix}
$$ 
This seems like performing element wise multiplication. If we have multiple channels then a convolution by a `1 x 1` filter makes more sense. If we have an image of size `6 x 6 x 32` and use a filter of size  `1 x 1 x 32`, this filter does the above operation for each channel  and adds its value. Several such filters can be used to get a multi channeled output. 

One use case of such network could be in order to decrease the number of channels. When we want to decrease the height or width we use the pooling layers, but if we want the number of channels to decrease we can use `1 x 1` filter. 

### Inception Network
Best way to explain this would be to use a example. Suppose we have an input image of size `28 x 28 x 192`. On this image we apply the following :
- 64 `1 x 1` filters to get a output image of size `28 x 28 x 64`.
- 128 `3 x 3` filter with same convolution to get a output image of size `28 x 28 x 128`.
- 32 `5 x 5` filter with same convolution to get a output image of size `28 x 28 x 32`.
- A max pooling layer with same convolution padding to get a `28 x 28 x 32` dimension output. 

We stack all this image outputs on top of each other to get a out image of size `28 x 28 x 256`. On issue of this network is the computation cost. Using a `1 x 1` filter also reduces the computation we have to perform. So if we want to compute the convolution for filter of higher dimensions we first reduce its total channels using a `1 x 1` filter. So in the above example we do the following : 
- 64 `1 x 1` filters to get a output image of size `28 x 28 x 64`.
- 96 `1 x 1` filter to get a image of size `28 x 28 x 96` on which we apply 128 `3 x 3` filter with same convolution to get a output image of size `28 x 28 x 128`.
- 16 `1 x 1` filter to get a image of size `28 x 28 x 96` on which we apply 32 `5 x 5` filter with same convolution to get a output image of size `28 x 28 x 32`.
- A max pooling layer with same convolution padding to get a `28 x 28 x 192` dimension output and which we apply 32 `1 x 1` filter to get an image of size `28 x 28 x 32`.  

Now let us look at networks like [[mobilenet | MobileNet]] which can also work on less compute environments. 