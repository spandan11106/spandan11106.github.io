---
title: Convolutional Layers
order: "6"
enableToc: "true"
---
### Example of a typical convolutional network. 

Let us take an example of a network with input image having dimensions `39 x 39 x 3`. So as per the [[one layer of a convolutional network#Notation | notation]] we get $n_H^{[0]} = n_W^{[0]} = 39$ and $n_C^{[0]} = 3$. 

For layer 1 we will take $f^{[1]} = 3$, $s^{[1]} = 1$ and $p^{[1]} = 0$. Suppose we use `10` filters in this layer. Each filter has dimension $\bigg[ 3, 3, 3\bigg]$. 

So after the convolution we get the resultant image having dimensions `37 x 37 x 10`. So we have $n_H^{[1]} = n_W^{[1]} = 37$ and $n_C^{[1]} = 10$. 

For layer 2 we will take $f^{[2]} = 5$, $s^{[2]} = 2$, $p^{[2]} = 0$ and $n_C^{[2]} = 20$. So after layer 2 we will get an resultant image having dimension `17 x 17 x 20`. So we have $n_H^{[2]} = n_W^{[2]} = 17$. 

For layer 3 let us use $f^{[3]} = 5$, $s^{[3]} = 2$ $p^{[3]} = 0$ and $n_C^{[3]} = 40$. So after layer 3 we get the image having dimensions `7 x 7 x 40`. 

After this layer we take all the $7 \times 7 \times 40 = 1960$ values and flatten them into a vector and then feed this to a logistic/softmax unit depending upon the type of classification we are performing. 

A typical convolutional network has 3 types of layers
- [[convolutional layers | Convolutional layer]] (`CONV`)
- [[pooling layer| Pooling layer]] (`POOL`)
- Fully connected layer (`FC`)

See now all this connect to [[CNN | Convolutional Neural Networks]] 

