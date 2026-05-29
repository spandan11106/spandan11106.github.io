---
title: Padding
---
Every time we apply the convolutional operation, the size of the image shrinks. 

For an image going convolution, we observe the the corner pixels come under the filter only once but pixels in the central area of the image come under the filter several times. 

To solve the issue of shrinking outputs and loss of information of the edges, we use padding. 

In padding we add a layer to the boundary of the image, so that when convolution is applied the image does not shrink much and its corner details are also taken into consideration. By convention we pad with the value `0`. 

$$
\begin{bmatrix} 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\ 0 & 3 & 0 & 1 & 2 & 7 & 4 & 0 \\ 0 & 1 & 5 & 8 & 9 & 3 & 1 & 0 \\ 0 & 2 & 7 & 2 & 5 & 1 & 3 & 0 \\ 0 & 0 & 1 & 3 & 1 & 7 & 8 & 0 \\ 0 & 4 & 2 & 1 & 6 & 2 & 8 & 0  \\ 0 & 2 & 4 & 5 & 2 & 3 & 9 & 0 \\ 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\ \end{bmatrix} 
$$ 
`p` is the padding value which in this case is 1

Now if we apply the convolutional operation to this matrix the resulting matrix is of size `6 x 6`, which is its original size and we also we do not lose any information.

In general if we pad a image by `p` and then apply a filter `f` then the output matrix will have dimensions `(n + 2p - f + 1)`. 

#### Valid Convolutions
In this type we do not use padding, So `p = 0`. 
$$
(n \times n) * (f \times f) \Longrightarrow ((n - f + 1) \times (n-f+1))
$$ 

#### Same Convolutions
Pad so that output size is the same as the input size. So in this case we need 
$$
n + 2p -f +1 = n
$$ 
Therefore, 
$$
p = \frac{f - 1}{2}
$$ 

>[!note]
>In computer vision problem `f` is usually odd

