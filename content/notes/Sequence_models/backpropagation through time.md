---
title: Backpropagation Through Time
enableToc: "true"
order: "3"
---
Now let us first go through the forward propagation. We take the activation $a^{<0>}$ as the initial activation. We use $W_a, b_a$ as parameters along with $x^{<1>}$ as input to calculate the activation $a^{<1>}$. We use the activation $a^{<t>}$ and $W_y, b_y$ to calculate the output $y^{<1>}$. This goes on till the last term. 

In order to compute back-propagation we need a loss function. So let us define a element wise loss function as :
$$
L^{<t>}(\hat{y}^{<t>}, y^{<t>}) = -y^{<t>}log(\hat{y}^{<t>}) - (1 - y^{<t>})log(1 - \hat{y}^{<t>}) 
$$
We define the loss function for the whole sequence as 
$$
L = \sum_{t = 1}^{T_y} L^{<t>}(\hat{y}^{<t>}, y^{<t>})
$$
We use this loss to perform back propagation. 

So far we have seen architectures where input length and output length is same. It turns out for several activation this may not be the case. So for this let us look at [[different types of rnns | Different Types of RNNs]]. 
