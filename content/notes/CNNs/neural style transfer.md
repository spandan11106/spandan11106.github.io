---
title: Neural Style Transfer
enableToc: "true"
order: "31"
---
![[Pasted image 20260626023213.png]]
This above image gives a gist of what neural style transfer is. For explanation purpose we will use `C` to denote the content image, `S` for the style image and `G` for the generated image. 

In order to make such a network, we need to know how the convolutional neural networks learn features at each layer and how to use this features. 

## What are deep `ConvNets` Learning
Any hidden layer of a convolution neural network often looks for relatively simple features such as edge or a particular shade of color. In the initial layers, the network see small part of the image, such as edges and colors only. As we move forward in the network, the layers start detecting more complex shapes and patterns. 

Now we want to define a cost function for neural style transfer. 

## Cost function
In order to implement neural style transfer, we are going to define a cost function `J` which is a function of the image `G` to measure how good a particular generated image is. We will use gradient descent to minimize `J` in order to generate this image. 

We define this cost function in two parts. The first part is the content cost and the second one is the style cost. 
$$
J(G) = \alpha J_{content}(C, G) + \beta J_{style}(S, G)
$$
Where hyper parameters $\alpha$ and $\beta$ are used to specify the relative weighting between the content and style cost.

In order to generate the image, we initiate `G` randomly in a shape. Then we define the cost function and aim to minimize it. 
$$
G := G - \frac{\partial}{\partial G} J(G)
$$

### Content cost function
Let's say we use hidden layer $l$ to compute the content cost. If $l$ is a very small number i.e. if we choose a initial layer, then it will force our generated image pixel values to be very similar to the content image. If we choose a higher layer, it will just satisfy the high level features of the content image. 

In practice a layer neither to shallow nor too deep in the network is chosen. So we first select a layer $l$ and then use a pre-trained `ConvNet`. Given a content image and a generated image, we want to measure how similar they are. We compute $a^{[l](C)}$ and $a^{[l](G)}$, if these two activation are similar, the both images have similar content. 
$$
J_{content}(C, G) = \frac{1}{2} \| \ a^{[l](C)} - a^{[l](G)} \ \|^2
$$

### Style cost function
Here we define style as correlation between activation across channels.Suppose we take activation of a layer of the network. The volume of this activation has dimensions $(n_h, n_w, n_c)$. 
Here we compare this activation for the style and the generated image channel by channel. Given a image, we compute the style matrix :
$$
a^{[l]}_{i, j, k} = \text{activation at } (i, j, k). \ G^{[l]} \text{ is }
\ n_c^{[l]} \times n_c^{[l]} 
$$
Here $G^{[l]}$ is the matrix which shows the correlation

In general, for a layer with $n_c$ channels, the correlation between any two channels `k` and `k'` is given by :
$$
G_{kk'}^{[l](S)} = \sum_{i=1}^{n_H^{[l]}}\sum_{j=1}^{n_W^{[l]}} a_{ijk}^{[l](S)}a_{ijk'}^{[l](S)}
$$
Since we are computing this for the style image, we use superscript `S`. We compute the same value as well for the generated image.
$$
G_{kk'}^{[l](G)} = \sum_{i=1}^{n_H^{[l]}}\sum_{j=1}^{n_W^{[l]}} a_{ijk}^{[l](G)}a_{ijk'}^{[l](G)}
$$
In linear algebra this matrix are also called grand matrices. 

Finally we can define the style cost function as follows :
$$
J_{style}^{[l]}(S, G) = \frac{1}{(2n_H^{[l]}n_W^{[l]}n_C^{[l]})^2}\| \ G^{[l](S)} - G^{[l](G)} \ \|^2
$$
$$
J_{style}^{[l]}(S, G) = \frac{1}{(2n_H^{[l]}n_W^{[l]}n_C^{[l]})^2} \sum_k\sum_{k'} (G_{kk'}^{[l](S)} - G_{kk'}^{[l](G)})
$$
Currently this cost function is only defined for the layer `l`. We apply this function on multiple layers using the following way :
$$
J_{style}(S, G) = \sum_l \lambda^{[l]}J_{style}^{[l]}(S, G)
$$
where $\lambda^{[l]}$ is a hyper-parameter. 

How we can define the overall cost function for the neural style transfer network and use gradient descent to minimize the cost. 

Now we can look at a [[code implementation of neural style transfer | Code implementation of Neural Style Transfer]]. 

So far we have focused on applying convolution to `2D` data. Let us see how we can [[1D and 3D generalization | generalize to 1D and 3D data]]. 