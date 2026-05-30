---
title: Convolutions over Volume
order: "4"
---
Let us consider Convolutions on `RGB` images. Let us consider an image with dimensions `6 x 6 x 3`. Here `6` is the height and width of the image and `3` is the number of channels of the image. 

Since the image has three dimensions, we will also require a filter with three dimensions. The output of the convolution operation would be a image with dimensions `4 x 4`.

Think of the filter and the image as three dimensional cubes. To find the value of the first element `[1, 1]`, we place the cubes to left edge matching the top left edge of the image. In the given case we find that `27` numbers overlap each other. We perform element vise multiplication of this values. We perform the process so on. 

Another way to think of this is that we divide the image into 3 matrices having dimensions `6 x 6`. Similarly we will have 3 filter of dimensions `3 x 3`. Then for each of the 3 matrices, we apply the convolution operation in two dimension with their respective filters to get three values. We then add this three values to get the value of the `[1, 1]` element of the resultant image. This process is repeated till we get the value of all the values in the resultant image. 

Now if we want to detect edges in the red channel of the image then we select the filters as follows :
$$
R = \begin{bmatrix} 1 & 0 & -1 \\ 1 & 0 & -1 \\ 1 & 0 & -1 \\ \end{bmatrix} \ \ \ G = \begin{bmatrix} 0 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \\ \end{bmatrix} \ \ \ 
B = \begin{bmatrix} 0 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \\ \end{bmatrix}
$$ 
If we want to detect edges of all colours then we can select the filters as follows :
$$
R = \begin{bmatrix} 1 & 0 & -1 \\ 1 & 0 & -1 \\ 1 & 0 & -1 \\ \end{bmatrix} \ \ \ 
G = \begin{bmatrix} 1 & 0 & -1 \\ 1 & 0 & -1 \\ 1 & 0 & -1 \\ \end{bmatrix} \ \ \
B = \begin{bmatrix} 1 & 0 & -1 \\ 1 & 0 & -1 \\ 1 & 0 & -1 \\ \end{bmatrix}
$$ 

The image and the filter, by convention should have the same number of channels. 

Now what if we want to not only detect vertical edges but also horizontal edges or edges at an particular angle. To do this we apply different filters as per our need to the image and get their resultant images. Then we stack this resultant images on to each other to form a volume. 

In the above example we could apply two filters, one for vertical edge detection and one for horizontal edge detection and then find two `4 x 4` resultant matrices. Then we can stack this matrices to form a final image with dimension `4 x 4 x 2`. 

In general if an image has $n_c$ channels and if we use $n_c'$ number of filters then we get :
$$
(n, n, n_c) * (f, f, n_c) \Longrightarrow (n - f + 1, n - f + 1, n_c')
$$ 
>[!note]
>In some deep learning literature channel is also represented as the depth of the volume
>

Now let us implement [[one layer of a convolutional network| One Layer of a Convolutional Network]] 