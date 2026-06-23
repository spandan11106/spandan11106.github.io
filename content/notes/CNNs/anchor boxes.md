---
title: Anchor Boxes
enableToc: "true"
order: "21"
---
Suppose we have a image and which a `3 x 3` grid is imposed. If two objects with their center appear to be in the same grid cell, for that grid cell we will have two classes with the value 1. 

Each object in training image is assigned to grid cell that contains object's midpoint and anchor box for the grid cell with highest `IoU` used. In the target label we encode the object as (grid cell, anchor box). 

So now since we have two anchor boxes the output becomes `3 x 3 x 2 x 8`. In practice this happens quite less if we use more defined grids. 

### Complete `YOLO` Alogrithm
Let us see how we can construct our training set. Suppose we are training out algorithm to detect 3 classes :
- 1 - pedestrian
- 2 - car
- 3 - motorcycle
We will be using 2 anchor boxes, so the output `y` will have dimensions `3 x 3 x 2 x 8`. Here `3 x 3` is the grid size so for each image we have 9 outputs. `2` because we are using 2 anchor boxes and for each box we have the variables $p_c$ which give probability of whether there is a object or not, $b_x$ and $b_y$ which are coordinates of the center of the box, $b_h$ and $b_w$ to give the height and width of the box and $c_1, c_2$ and $c_3$ having value either 0 or 1 depending on the presence of three above classes. 

So `y` is given by :
$$
y = \begin{bmatrix} p_c \\ b_x \\ b_y \\ b_h \\ b_w \\ c_1 \\ c_2 \\ c_3 \\ p_c \\ b_x \\ b_y \\ b_h \\ b_w \\ c_1 \\ c_2 \\ c_3 \\  \end{bmatrix}
$$
In training we go through each of the grid cell and form our target label `y`. Now suppose a gird cell has a car in it ans the car has a better `IoU` to anchor box 2 then 1, then y would look like this :
$$
y = \begin{bmatrix} 0 \\ ? \\ ? \\ ? \\ ? \\ ? \\ ? \\ ? \\ 1 \\ b_x \\ b_y \\ b_h \\ b_w \\ 0 \\ 1 \\ 0 \\  \end{bmatrix}
$$

Now after we run out image through the network, we perform non-max suppression. If we are using 2 anchor boxes, then for each gird cell, we get 2 predicted bounding boxes. Then we get rid of low probability predictions. For each class use non-max suppression to generate final prediction. 

Now what if we want to know the exact pixels which belong to the object and which do not. For this we use algorithm such as [[semantic segmentation | Semantic Segmentation]]. 
