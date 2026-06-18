---
title: MobileNet
enableToc: "true"
order: "14"
---
### Depthwise Separable Convolution
Suppose we have a input image of size $[n, n, n_c]$ on which we apply $n_c$ filters of size $[f, f]$ to get a output image of size $[n-f+1, n-f+1, n_c]$. This output image then put through point-wise convolution, that is we use $n_c'$ filters of size $[1, 1, n_c]$ to get a output image of size $[n-f+1, n-f+1, n_c']$. 

Now this could have been done directly also by straight away using $n_c'$ filters of size $[f,f]$. But this would mean we would have to perform more computations. In general using a `Depthwise Separable` Convolution reduces the computation by a factor of 
$$
\frac{1}{n_c'} + \frac{1}{f^2}
$$

### MobileNet
In the original `MobileNet` paper the `Depthwise Separable` layer is used 13 times. In the `v2` of this paper a residual connection was used. 

In the `MobileNet v2` the following architecture is used :
- We apply a expansion layer in which we expand the input image using multiple `1 x 1` filters. 
- Then a `Depthwise` layer is applied and then a `Pointwise` one. 

This is used 17 times in the original paper.

Now let us look at [[transfer learning | Transfer Learning]] 

For the code implementation of this network go to - [[code implementation of mobile-net | Code implementation of MobileNet with Transfer Learning]]. 