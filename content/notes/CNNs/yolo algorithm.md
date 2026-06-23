---
title: YOLO Algorithm
enableToc: "true"
order: "20"
---
`YOLO` stands for you only look once. In this algorithm we place a grid on out input image. We pass each cell of the grid in the `ConvNet` to get `y` for the grid cell. `y` is defined as follows :
$$
y = \begin{bmatrix} p_c \\ b_x \\ b_y \\ b_h \\ b_w \\ c_1 \\ c_2 \\ c_3\end{bmatrix}
$$
If $p_c$ is 0, then we do not care about rest of the values of the output `y`, since there is no object present. If $p_c$ is 1, then we mark that grid. So for an input image if we use a `3 x 3` grid then this grid will give an output volume with dimensions `3 x 3 x 8`, since `y` has 8 dimensions. 

So if we pass this input image in a `ConvNet`, and we get a output of size `3 x 3 x 8`, it effectively translate to the above output. In practice we use a much finer grid. This algorithm is computationally fast. 

### Specifying the bounding box
So if a particular grid cell has an object, we have $p_c = 1$. By convention we take the top left corner of the grid cell to have coordinate `(0, 0)` and the bottom right corner to have coordinate `(1, 1)`. $b_x$ and $b_y$ give the coordinates of the center of the object. $b_h$ and $b_w$ are specified relative to the grid cell i.e. as fraction of the grid cell height and width respectively. The center coordinates must have value between `0` and `1`. The height and width fraction can be greater then 1 since the object can extend to outside of the box as well. 

### Intersection over Union
Intersection over Union is a technique used to determine if our object detection algorithm is working well or not. Suppose we have a the output of a object detection algorithm which is a bounding box which does not cover the full car (say about 90% is covered), and it also has some elements of the background in it. Suppose this box is blue in color. We also have a red box, which covers the car perfectly. 

We take the intersection of the blue and red bounding box and their union as well. Then we define the Intersection over Union (`IoU`) as :
$$
\text{IoU} = \frac{\text{size of union}}{\text{size of intersection}}
$$
By convention we take the model to be good if $\text{IoU} \geq 0.5$. More generally, `IoU` is a measure of the overlap between two bounding boxes. 

### Non-max suppression 
Now while using this `YOLO` algorithm it might find the same object and detect it multiple times if the object expands on multiple grids. To make sure that an object is only detected once, we use non-max suppression. 

Now if we have multiple detection, we also have the confidence i.e. the probability that there is a object there or not which is given by the variable $p_c$ in $y$. So if for a particular object we have multiple detection, we highlight the one which has the highest probability and suppress the one with the lower probability. We pick the box with the highest probability. 

One problem with `YOLO` is that we can detect only one  box at a time in a grid cell. In order to solve this we use [[anchor boxes | Anchor Boxes]]. 