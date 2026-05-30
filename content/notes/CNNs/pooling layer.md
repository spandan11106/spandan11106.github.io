---
title: Pooling Layers
order: "7"
enableToc: "true"
---
### Max Pooling 

Suppose we have a `4 x 4` input image to which we want to apply `Max pooling`, which is a type of pooling and the output size is `2 x 2`. 
$$
\begin{bmatrix} 1 & 3 & 2 & 1 \\ 2 & 9 & 1 & 1 \\ 1 & 3 & 2 & 3 \\ 5 & 6 & 1 & 2 \\ \end{bmatrix} \Longrightarrow \begin{bmatrix} 9 & 2 \\ 6 & 3\end{bmatrix}
$$

Here we took the max element in the two by two regions to find the values in the resultant matrix. For the `[1, 2]` element of the resultant matrix we did the following : 
$$
\text{max}\Bigg( \begin{bmatrix} 2 & 1 \\ 1 & 1\end{bmatrix}\Bigg) = 2
$$ 
Since we are taking max over a region of `2` we have `f = 2` and since we skip 2 rows/columns every new element we have `s = 2`. 

Here `f` and `s` are hyper-parameters of max pooling. We use max pooling to highlight the strong features and also because it works well. 

For images having multiple channels, we have output also having the same number of channels. In this case we perform max pooling channel vise. 

### Average Pooling
As the name suggest, we perform the same operations as max pooling but instead of taking the max, we take the average of the elements in the filter. 

One things to note is there are no parameters to learn in pooling operations. 

Now that we know what pooling is let us understand now [[CNN | Convolutional Neural Networks]] works as a whole. 