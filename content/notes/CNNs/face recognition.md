---
title: Face Recognition
enableToc: "true"
order: "27"
---
### Face verification vs. Face recognition
1. Verification 
    - Input image, name/`ID`
    - Output whether the input image is that of the claimed person

2. Recognition
     - Has a database of `K` persons
     - Get an input image
     - Output `ID` if the image is any of the `K` persons (or "not recognized")

### One shot learning
In face recognition systems we need the model to learn from one example to recognize the person again. In a normal CNN, we could train the network on the number of employees we have, but this is not feasible since if new people join the work place we will have to train the network again.

It is much better to learn a similarity function. We define the function on a high level as follows :
$$
\text{d(img1, img2)} = \text{degree of difference between images}
$$
A good way to make this function is to use a siamese network. 

### Siamese Network
We use a traditional convolutional neural network, but instead of using the softmax layer as the last layer, we just skip it. Suppose when we put image of a person through this network we get a vector of size 128. So if $x^{(1))}$ is the input, then the vector is represented as the output of the function which is the network as $f(x^{(1)})$. 

Similarly for input $x^{(2)}$, we get the vector $f(x^{(2)})$. We define the distance between this two images as :
$$
d(x^{(1)}, x^{(2)}) = \| f(x^{(1)}) - f(x^{(2)}) \|_2^2
$$
This is known as the siamese neural network architecture. If $x^{(1)}$ and $x^{(2)}$ are the same person then we want $d$ to be small and vice versa.

One way to learn the parameters of the neural network, so that it gives a good encoding for our pictures of faces, is to define and apply gradient descent on the [[triplet loss function | Triplet Loss Function]]. 

