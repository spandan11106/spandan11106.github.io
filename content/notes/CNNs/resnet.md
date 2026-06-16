---
title: ResNets
enableToc: "true"
order: "12"
---
Here we will learn about skip connections which allows us to take activation from one layer and suddenly feed it to another layer even much deeper in the neural network. 

### Residual block
Suppose we have two layers of a neural network where you start off with some activation in layer $a^{[l]}$, then goes $a^{[l+1]}$ and then deactivation two layers later is $a^{[l+2]}$. 

We go through the the this two layers are follows :
$$
\begin{align*}
a^{[l]} \longrightarrow z^{[l+1]} = W^{[l+1]}a^{[l]} + b^{[l+1]}  \ \ \  (\text{Linear}) \\ 
a^{[l+1]} = g(z^{[l+1]}) \ \ \ (\text{ReLU}) \ \ \ \ \ \ \ \ \ \ \ \ \ \\
a^{[l+1]} \longrightarrow z^{[l+2]} = W^{[l+2]}a^{[l+1]} + b^{[l+2]} \ \ \ (\text{Linear}) \\
a^{[l+2]} = g(z^{[l+2]}) \ \ \ (\text{ReLU}) \ \ \ \ \ \ \ \ \ \ \ \ \ \  
\end{align*}   
$$
Now in a normal network the activation $a^{[l]}$ goes through this standard path. In a `ResNet` we can directly use the activation $a^{[l]}$ in the layer 2 $\text{ReLU}$ part. So a `ResNet` does the following 
$$
a^{[l+2]} = g(z^{[l+2]} + a^{[l]})
$$
This 'short-cut' is also referred to as skip connection.

In a Residual Network, we can have several residual block.

### Why `ResNets` work well ??
`ResNets` work well because they solve the degradation problem in very deep neural networks. In practice, deeper networks often perform worse. The optimization becomes difficult because gradients must flow through many layers, and the network struggles to learn useful transformations. 

Now if the dimensions of $z^{[l+2]}$ and $a^{[l]}$ are different, then we multiply $a^{[l]}$ by a matrix $W_s$ to make sure that they have the same dimensions. 

In terms of image generation neural networks. We usually use same convolution, so that we have the same consistent size across the residual block and do not have to use the $W_s$ matrix. 

Now let us look at how we can use a [[one by one convolution | One by One Convolutions ]] 