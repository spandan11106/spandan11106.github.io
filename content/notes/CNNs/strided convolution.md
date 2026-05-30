---
title: Strided Convolution
order: "3"
---
One method to apply convolution is to use strides. Usually while performing convolution, if we want to find the value of the next element of a row towards the right direction, then we move the filter towards the right by one column. Similarly, if we want to find the value of an next element in a column, towards the bottom direction we move the filter in the bottom direction by one row.

In `strided convolution` instead of moving the filter by one column or row, we move it by `s` columns/rows

$$
\begin{bmatrix} 2 & 3 & 7 & 4 & 6 & 2 & 9 \\ 6 & 6 & 9 & 8 & 7 & 4 & 3  \\  3 & 4 & 8 & 3 & 8 & 9 & 7 \\ 7 & 8 & 3 & 6 & 6 & 3 & 4 \\ 4 & 2 & 1 & 8 & 3 & 4 & 6 \\ 3 & 2 & 4 & 1 & 9 & 8 & 3 \\ 0 & 1 & 3 & 9 & 2 & 1 & 4 \\ \end{bmatrix}  * \begin{bmatrix} 3 & 4 & 4 \\ 1 & 0 & 2 \\ -1 & 0 & 3 \\ \end{bmatrix}  =  \begin{bmatrix} 91 & 100 & 83 \\ 69 & 91 & 127 \\ 44 & 72 & 74\end{bmatrix}
$$ 

So for the `[1, 1]` element of the we place the filter's top left corner with the image top left corner. Now for the next element of the resultant i.e. `[1, 2]`, we shift the filter by 2 columns.

$$
\begin{bmatrix} 2 & 3 & 7_3 & 4_4 & 6_4 & 2 & 9 \\ 6 & 6 & 9_1 & 8_0 & 7_2 & 4 & 3  \\  3 & 4 & 8_{-1} & 3_0 & 8_3 & 9 & 7 \\ 7 & 8 & 3 & 6 & 6 & 3 & 4 \\ 4 & 2 & 1 & 8 & 3 & 4 & 6 \\ 3 & 2 & 4 & 1 & 9 & 8 & 3 \\ 0 & 1 & 3 & 9 & 2 & 1 & 4 \\ \end{bmatrix} =  100
$$

Similar for element `[2, 1]`, we shift the filter by 2 rows

$$
\begin{bmatrix} 2 & 3 & 7 & 4 & 6 & 2 & 9 \\ 6 & 6 & 9 & 8 & 7 & 4 & 3  \\  3_3 & 4_4 & 8_4 & 3 & 8 & 9 & 7 \\ 7_1 & 8_0 & 3_2 & 6 & 6 & 3 & 4 \\ 4_{-1} & 2_0 & 1_3 & 8 & 3 & 4 & 6 \\ 3 & 2 & 4 & 1 & 9 & 8 & 3 \\ 0 & 1 & 3 & 9 & 2 & 1 & 4 \\ \end{bmatrix} = 69
$$ 

In general if we have a `n x n` image, a `f x f` filter, if we use padding `p` and stride `s`, then the resultant image has dimensions $$\bigg( \frac{n + 2p -f}{s} + 1 \bigg) \times \bigg( \frac{n + 2p -f}{s} + 1 \bigg)$$ 

If the above fraction is not an integer, we round it down. By convention, while performing strided convolution, if after moving the filter by either `s` columns or rows, if we find the filter having some of its part outside the image, we do not compute that part.

You might have seen the use of the word convolution to represent a different process, but in deep learning literature this is what is defined as convolution. To read more on this go to - [[cross-correlation vs. convolution | Technical note on cross-correlation vs. convolution]]

Now we know how convolution is performed on two dimension images, let us move to three dimensional volumes (example. `RGB` images) in [[convolutions over volume | Convolutions over Volume]] 
