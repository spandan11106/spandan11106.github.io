---
title: One layer of a convolutional network
order: "5"
enableToc: "true"
---
Here is how we implement one layer of a convolutional network :
- We perform convolution of volume on the input image. 
- We use number of filters depending on the number of features we want to detect
- To each of the resultant image we add an bias which is a real number and then apply a non-linear operation, such as `ReLU` on it. 
- We then stack all the resultant images. 

If you have read [[convolutions over volume | Convolution over volume]], which you should, we will you the same example which we used there. The convolution operation used to give us resultant images of dimensions `4 x 4`. We then do the following : 
$$
\text{ReLU} ( \ \text{Resultant Image from convolution with a single kernel} + b_1 \ )
$$ 
This is done for all the resultant images from all kernels and then they are stacked onto one another. This are the operations of one layer of convolutional network.

Here if we consider a single filter then we have `28` parameters. `27` values of the filter and the bias. 

So even if we apply ten filter we will get only about `280` parameters. So we can use this filters on images of large size, while having comparatively less number of parameters. 

### Notation
If `l` is a convolutional layer :
- $f^{[l]}$ - filter size of layer `l`
- $p^{[l]}$ - padding 
- $s^{[l]}$ - stride
- Input dimension - $\bigg[ n_H^{[l-1]}, n_W^{[l-1]}, n_C^{[l-1]} \bigg]$  
- Output dimension - $\bigg[ n_H^{[l]}, n_W^{[l]}, n_C^{[l]} \bigg]$ where $n^{[l]} = \bigg[ \frac{n^{[l - 1]} + 2p^{[l]} - f^{[l]}}{s^{[l]}} + 1 \bigg]$ and $n_C^{[l]}$ is the number of filters we have used
- Filter dimension - $\bigg[ f^{[l]}, f^{[l]}, n_C^{[l-1]} \bigg]$ 
- Activation - $a^{[l]}$ has same dimensions as the output. For vectorization approach if we have `m` examples then dimensions are $\bigg[ m, n_H^{[l]}, n_W^{[l]}, n_C^{[l]}\bigg]$ 
- Weights dimension - $\bigg[ f^{[l]}, f^{[l]}, n_C^{[l-1]}, n_C^{[l]}\bigg]$ 
- Bias dimension - $\bigg[ 1, 1, 1, n_C{[l]}\bigg]$ 

Let us move onto to a [[convolutional layers| Convolutional network]] which has more layers and see how it works. 