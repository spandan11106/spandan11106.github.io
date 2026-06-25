---
title: Triplet Loss Function
enableToc: "true"
order: "28"
---
We want images of the same person to have a less distance in the final encoding vectors and more distance for images of the different person. So in-order to train the network in this way, we define a anchor image, a positive image which is of the same person in the anchor image and a negative image which is of a different person. We will use `A`, `P` and `N` respectively for the anchor, positive and negative image. 

So what we want is :
$$
d(A, P) \leq d(A, N)
$$
$$
\| f(A) - f(P)\|^2 - \|f(A) - f(N)\|^2 \leq 0
$$
One trivial solution that satisfies the above equation is $f(x) = 0$ where $x$ is any image. To avoid this, instead of saying that this is less then zero, we need it to be less then $-\alpha$, where $\alpha$ is a small number known as the margin.
$$
\| f(A) - f(P)\|^2 - \|f(A) - f(N)\|^2 + \alpha \leq 0 
$$

### Defining the Loss Function.
Given the 3 images `A`, `P` and `N`, where `A` and `P` are images of the same person and `A` and `N` are images of different person. We define the loss function as follows for a single triplet :
$$
L(A, P, N) = \text{max}(\| f(A) - f(P)\|^2 - \|f(A) - f(N)\|^2 + \alpha, \ 0)
$$
The overall loss function for our dataset is given by :
$$
J = \sum^m_{i=1} L(A^{(i)}, P^{(i)}, N^{(i)})
$$
While training we require multiple pictures of the same person. But after training during inference, only one picture is enough to recognize the person. 

### Choosing the triplets A,P,N
If we choose A, P, N randomly then the condition can be easily satisfied. We want to choose triplets that are hard to train on. 

Today's face recognition systems are trained on very large datasets. Pre-trained model are available on the internet, so that we do not have to train the network from scratch saving computational cost.

Now let us see how we can look at [[face verification and binary classification | face recognition as a straight binary classification problem]]. 
