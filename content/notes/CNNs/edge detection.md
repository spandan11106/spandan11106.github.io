---
title: Edge Detection
enableToc: "true"
order: "1"
---
The convolutional operation is of the building block of CNNs. In this section we will see the example of Vertical Edge Detection 

$$
\begin{bmatrix} 3 & 0 & 1 & 2 & 7 & 4  \\ 1 & 5 & 8 & 9 & 3 & 1  \\  2 & 7 & 2 & 5 & 1 & 3  \\ 0 & 1 & 3 & 1 & 7 & 8  \\ 4 & 2 & 1 & 6 & 2 & 8  \\ 2 & 4 & 5 & 2 & 3 & 9  \\ \end{bmatrix}  * \begin{bmatrix} 1 & 0 & -1 \\ 1 & 0 & -1 \\ 1 & 0 & -1 \\ \end{bmatrix}  =  \begin{bmatrix} -5 & -4 & 0 & 8 \\ -10 & -2 & 2 & 3 \\ 0 & -2 & -4 & -7 \\ -3 & -2 & -3 & -16 \\ \end{bmatrix}
$$ 

Here the `6 x 6` matrix is an image we want to work on. The `3 x 3` matrix is called as the `filter`. In some research papers it is also known as the `kernel`. 

`*` is the convolution operator. Here it is not the multiplication operator. 

Let us consider `[1, 1]` element which is `-5` of the resultant matrix, we get this value as follows : 

$$
\begin{bmatrix} 3_1 & 0_0 & 1_{-1} & 2 & 7 & 4  \\ 1_1 & 5_0 & 8_{-1} & 9 & 3 & 1  \\  2_1 & 7_0 & 2_{-1} & 5 & 1 & 3  \\ 0 & 1 & 3 & 1 & 7 & 8  \\ 4 & 2 & 1 & 6 & 2 & 8  \\ 2 & 4 & 5 & 2 & 3 & 9  \\ \end{bmatrix} =  -5
$$ 

Imagine the `3 x 3` filter is kept on the image matrix with its top corner aligning with the top corner of the image matrix. Here I have written the values of the filter matrix in the subscript of that of the image matrix. 

To find the value `-5` we multiply the image matrix value on which the filter is there (i.e. ones with the subscript) with the filter value (i.e. the subscript value). 

$$
(3 \times1 + 0 \times 0 + 1 \times -1) + (1 \times1 + 5 \times 0 + 8 \times -1) +  (2 \times1 + 7 \times 0 + 2 \times -1) = -5
$$ 

For the `[1, 2]` element of the resultant matrix, the filer is shifted one column towards the right. Similarly, for the `[2, 1]` element the filter is shifted one row towards the bottom.

This procedure is repeated until we do not find the complete resultant matrix. 

But how does this help us with edge detection. Think of the filter matrix values as brightness. So the matrix used above has bright values in the first column and light values in the third column. The zero column means that the values might me in the mid range. 

So we can say that vertical edge is a `3 x 3` region (since our filter is a `3x3` matrix) where there brighter pixels on one side and lighter pixels on the other.  

When we `convolute` this filter onto the image the vertical edges become more visible. 

> [!note]
>To implement this in code we use the following :
>- In Python (manual implementation) - `conv-forward`
>- In `tensorflow` - `tf.nn.conv2d`
>- In `keras` - `Conv2D` 

For a horizontal edge we use the matrix :
$$
\begin{bmatrix} 1 & 1 & 1 \\ 0 & 0 & 0 \\ -1 & -1 & -1\\ \end{bmatrix}
$$ 
There are several types of filters :
- Sobel filter - $$\begin{bmatrix} 1 & 0 & -1 \\ 2 & 0 & -2 \\ 1 & 0 & -1\\ \end{bmatrix}$$ It put more weight on the central pixel

- Scharr filter - $$\begin{bmatrix} 3 & 0 & -3 \\ 10 & 0 & -10 \\ 3 & 0 & -3\\ \end{bmatrix}$$ 

In complicated datasets one option is to learn the filter matrix values as parameters during training. 

$$
\begin{bmatrix} w_1 & w_2 & w_3 \\ w_4 & w_5 & w_6 \\ w_7 & w_8 & w_9 \\ \end{bmatrix}
$$

By setting this values as parameters, it is seen that neural networks can learn to recognise lower level features. 

In general if we have a `n x n` image and a `f x f` filter then our resultant image matrix will have dimensions `(n - f + 1) x (n - f + 1)` 

In order to build deep neural networks, one modification which we need to make to the basic convolutional operation is [[padding | Padding]]
