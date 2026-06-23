---
title: Object Localization
enableToc: "true"
order: "18"
---
For classification we just labelled the data bur with localization in picture the algorithm also has to show the location of the labelled data in the image. Later we will learn about the detection problem where now there might be multiple objects in the picture and we have to detect them all and localized them all.

### Classification with localization 
Suppose we have a classification pipeline which is used to classify cars, pedestrian, motorcycle or background on an image. What if we also want to localize the car in the image as well. To do that, we change our network to have a few more output units that output a bounding box. So in particular, the network output four more numbers $b_x, b_y, b_h, b_w$. 

So, using the general convention we take the top left corner as the origin and the bottom right corner as (1, 1). So here $b_x, b_y$ are the coordinates of the bounding box and $b_h, b_w$ are the height and the width respectively. 

### Defining the target label y
Suppose we have an image and we want to identify the following : 
- 1 - pedestrian
- 2 - car
- 3 - motorcycle
- 4 - background
Now we define y as follows : 
$$
y = \begin{bmatrix} p_c \\ b_x \\ b_y \\ b_h \\ b_w \\ c_1 \\ c_2 \\ c_3\end{bmatrix}
$$
So if the object is, classes 1, 2 or 3, $p_c$ will be equal to $1$. And if it is the background class, so if it is none of the objects you are trying to detect, then $p_c$ will be $0$. If there is a object, $b_x, b_y, b_h, b_w$ give the position of the bounding box and $c_1, c_2, c_3$ give which of the class 1, 2 and 3 exist in the image.

If there is no object i.e. $p_c = 0$, then we do not care about rest of the variables in $y$. We define the loss function as follows :
$$
L(\hat{y}, y) = 
\begin{cases} 
(\hat{y_1} - y_1)^2 + (\hat{y_2} - y_2)^2 + ..... + (\hat{y_8} - y_8)^2 & \text{if } y_1 = 1 \\
(\hat{y_1} - y_1)^2 & \text{if } y_1 = 0
\end{cases}
$$
Here we have used squared error for simplified description. In practice we probably use logistic error for $p_c$, square error for the bounding square variable and a log like feature loss with softmax output for the class variables

### Landmark detection
We could modify a neural network to output specific locations of on image. Suppose we are building a face detection model and we also want to know the position of the corner of the eyes. So we need 4 four points in our output. What we could do is train the network of this points and then modify the output to give 9 values; 1 to know if the face is there or not and other 8 to know the x and y coordinate of the corners of the eye. This is known as landmark detection. 

Now let us look at [[object detection | Object Detection]]. 