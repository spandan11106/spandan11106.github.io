---
title: Cross-correlation vs. Convolution
---
In mathematics and physics literature the process we just used, that is placing the kernel (filter) on the top - left of the image and multiply element-wise and then move the kernel one step right for the next element until we find all the values is called as `cross-correlation`. 

In classical `Convolution` before sliding we flip the kernel both horizontally and vertically.  If this is the original kernel : 
$$
\begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix}
$$ 
then we flip it : 
$$
\begin{bmatrix} -1 & 0 \\ 0 & 1\end{bmatrix}
$$ 
and then perform the same operations as `cross-correlation` 

In deep learning the network **learns the kernel weights automatically**. There is no need to flip anything because if the flipped version were better, gradient descent would simply learn that version.

So in short :
- **Cross - correlation** uses the kernel as it is
- **Convolution** flips the kernel and then uses it
- **CNNs** use the kernel as it is but call it convolution. 

