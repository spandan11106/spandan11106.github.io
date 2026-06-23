---
title: Transpose Convolution
enableToc: "true"
order: "23"
---
Let us work this out with an example :
In this example we will use a filter of size `f x f` = `3 x 3`, padding `p = 1` and stride `s = 2`. 
$$
\begin{bmatrix} 2 & 1 \\ 3 & 2 \end{bmatrix} \ * \ \begin{bmatrix} 1 & 2 & 1 \\ 2 & 0 & 1 \\ 0 & 2 & 1 \end{bmatrix} = \begin{bmatrix} 0 & 0 & 0 & 0 & 0 & 0 \\ 0 & 0 & 4 & 0 & 1 & 0 \\ 0 & 10 & 7 & 6 & 3 & 0 \\ 0 & 0 & 7 & 0 & 2 & 0 \\ 0 & 6 & 3 & 4 & 2 & 0 \\ 0 & 0 & 0 & 0 & 0 & 0 \end{bmatrix}
$$
Here is how we calculate the elements, 
We take the first element of the input image which is `2` and multiply is with the filter values. In normal calculation we use to lay the filter on the input image, here we lay it on the output. We start with the top left corner. We ignore the padding values and keep rest of the values on the output image. 
$$
\begin{bmatrix} 1^2 & 2^2 & 1^2 \\ 2^2 & 0^2 & 1^2 \\ 0^2 & 2^2 & 1^2 \end{bmatrix} \longrightarrow \begin{bmatrix} 0 & 0 & 0 & 0 & 0 & 0 \\ 0 & 0 & 2 & 0 & 0 & 0 \\ 0 & 4 & 2 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 & 0 & 0 \end{bmatrix}
$$
After this we use the next element of the input image and shift the filter by 2 since we use stride 2. If there is a overlap between the filter and the previous values, we add the values. 

Now let us look at the [[u-net architecture | U-Net Architecture]] which is used to implement [[semantic segmentation | Semantic Segmentation]].