---
title: Code implementation of CNN
order: "10"
enableToc: "true"
---
Here we are going to implement convolution layers and pooling layers from scratch using just `numpy`.

### `zero_pad`
This function pads all images of a batch of examples `X` with zeros. 
```python
def zero_pad(X, pad):
    """
    X -- numpy array of shape (m, n_H, n_W, n_C)
    X_pad -- padded image of shape (m, n_H + 2*pad, n_W + 2*pad, n_C)
    """
    X_pad = np.pad(X, 
            ((0,0), (pad, pad), (pad, pad), (0,0)), 
            mode = 'constant', 
            constant_values = (0,0))
            
    return X_pad
```

### `conv_single_step`
This implements a single step of convolution, in which we apply the filter to a single position of the input. 
```python
def conv_single_step(a_slice_prev, W, b):
    """
    Apply one filter defined by parameters W on a single slice of the output 
    activation of the previous layer.
    
    a_slice_prev -- slice of input data of shape (f, f, n_C_prev)
    W -- (f, f, n_C_prev)
    b -- (1, 1, ,1)
    """
    s = a_slice_prev*W
    Z = np.sum(s)
    Z = Z + np.float64(b)
    
    return Z
```

### `conv_forward`
Here we convolve the filters `W` on an input activation `A_prev`.  
```python
def conv_forward(A_prev, W, b, hparameters):
    """
    A_prev -- output of the previous layer. (m, n_H_prev, n_W_prev, n_C_prev)
    W -- (f, f, n_C_prev, n_C)
    b -- (1, 1, 1, n_C)
    
    Returns:
    Z -- conv output. (m, n_H, n_W, n_C)
    """
    (m, n_H_prev, n_W_prev, n_C_prev) = A_prev.shape
    (f, f, n_C_prev, n_C) = W.shape
    stride = hparameters["stride"]
    pad = hparameters["pad"]
    
    n_H = int((n_H_prev - f + 2*pad)/stride) + 1
    n_W = int((n_W_prev - f + 2*pad)/stride) + 1
    
    Z = np.zeros((m, n_H, n_W, n_C))
    A_prev_pad = zeros_pad(A_prev, pad)
    
    for i in range(m):
       a_prev_pad = A_prev_pad[i]
       for h in range(n_H):
          vert_start = h*stride
          vert_end = vert_start + f
          for w in range(n_W):
             horiz_start = w*stride
             horiz_end = horiz_start + f
             for c in range(n_C):
                 a_slice_prev = a_prev_pad[vert_start:vert_end,
                 horiz_start:horiz_end, :]
                 weights = W[:, :, :, c]
                 biases = b[:, :, :, c]
                 Z[i, h, w, c] = conv_single_step(a_slice_prev, 
                                 weights, biases) 
                                 
    cache = (A_prev, W, b, hparameters)
    
    return Z, cache
```

### `pool_forward`
```python
def pool_forward(A_prev, hparameters, mode ="max"):
    (m, n_H_prev, n_W_prev, n_C_prev) = A_prev.shape
    
    f = hparameters["f"]
    stride = hparameters["stride"]
    
    n_H = int(1 + (n_H_prev - f)/stride)
    n_W = int(1 + (n_W_prev - f)/stride)
    
    A = np.zeros((m, n_H, n_W, n_C))
    
    for i in range(m):
       for h in range(n_H):
       vert_start = h*stride
       vert_end = vert_start + f
       for w in range(n_W):
          horiz_start = w*stride
          horiz_end = horiz_start + f
          for c in range(n_C):
             a_prev_slice = A_prev[i, vert_start:vert_end,
             horiz_start:horiz_end, c]
             if mode == "max":
                A[i, h, w, c] = np.max(a_prev_slice)
             elif mode == "average":
                A[i, h, w, c] = np.mean(a_prev_slice)
                
    cache = (A_prev, hparameters)
    
    return A, cache  
```

### Convolutional Layer Backward Pass
Formula for computing $dA$ with respect to the cost for a certain filter $W_c$ and a given training example is given by: 
$$
dA = dA + \sum_{h=0}^{n_H}\sum_{w = 0}^{n_W} W_c\times dZ_{hw}
$$
Where $W_c$ is a filter and $dZ_{hw}$ is a scalar corresponding to the gradient of the cost with respect to the output of the conv layer Z at the `hth` row and the `wth` column

For $dW_c$ we use the following formula :
$$
dW_c = dW_c + \sum_{h = 0}^{n_H}\sum_{u = 0}^{n_W} a_{slice}\times dZ_{hw}
$$
where $a_{slice}$ corresponds to the slice which was used to generate the activation $Z_{ij}$. 

Similarly in order to compute $db$ with respect to the cost for a certain filter $W_c$ we use :
$$
db = \sum_h\sum_w dZ_{hw}
$$

```python
def conv_backward(dZ, cache):
    """
    Args:
    dZ -- gradient of the cost w.r.t. the output of the conv layer. 
          Has dimensions (m, n_H, n_W, n_C)
    cahce -- Output of conv_forward()
    Returns:
    dA_prev -- gradient of cost w.r.t. input of conv layer (A_prev)
               Has dimensions (m, n_H_prev, n_w_prev, n_C_prev)
    dW -- gradient of the cost w.r.t. to the weights of the conv layer
          Has dimensions (f, f, n_C_prev, n_C)
    db -- gradient of cost w.r.t. to the biases of the conv layer
          Has dimensions (1, 1, 1, n_C)
    """
    
    (A_prev, W, b, hparameters) = cache
    (m, n_H_prev, n_W_prev, n_C_prev) = A_prev.shape
    (f, f, n_C_prev, n_C) = W.shape
    
    stride = hparaametrs["stride"]
    pad = hparameters["pad"]
    
    (m, n_H, n_W, n_C) = dZ.shape
    
    dA_prev = np.zeros((m, n_H_prev, n_W_prev, n_C_prev))
    dW = np.zeros((f, f, n_C_prev, n_C))
    db = np.zeros((1, 1, 1, n_C))
    
    A_prev_pad = zero_pad(A_prev, pad)
    dA_prev_pad = zero_pad(dA_prev, pad)
    
    for i in range(m):
       a_prev_pad = A_prev_pad[i]
       da_prev_pad = dA_prev_pad[i]
       for h in range(n_H):
          for w in range(n_W):
             for c in range(n_C):
                vert_start = stride*h
                vert_end = vert_start + f
                horiz_start = stride*w
                horiz_end = horiz_start + f
                
                a_slice = a_prev_pad[vert_start:vert_end,
                                     horiz_start:horiz_end, :]
                da_prev_pad[vert_start:vert_end,
                            horiz_start:horiz_end, :] +=  W[:,:,:,c]*dZ[i, h, w, c]
                dW[:,:,:,c] += a_slice*dZ[i, h, w, c]
                db[:,:,:,c] += dZ[i, h, w, c]
                
        dA_prev[i, :, :, :] = da_prev_pad[pad:-pad, pad:-pad, :]
        
    return dA_prev, dW, db
```
Towards the end of backward pass we remove the padding we had once give to the image. The padded zeros are **not parameters** and **not inputs**. They are fake values that will always remain zero. So we pad during backprop only because the convolution operation was performed on a padded image. After computing the gradients, we extract the part corresponding to the **real input**. 

### Pooling Layer Backward Pass
Even though a pooling layer has no parameters for backprop to update, you still need to backpropagate the gradient through the pooling layer in order to compute gradients for layers that came before the pooling layer.

We are going to implement a helper function called `create_mask_from_window()` which keeps track of where the maximum of the matrix is. 
```python
def create_mask_from_window(x):
    mask = x == np.max(x)
    return mask
```

In max pooling, for each input window, all the influence on the output came from a single input value -- the max. In average pooling, every element of the input window has equal influence on the output. 

So for avg pooling we need another helper function called `distribute_value()`. 
```python
def distribute_value(dz, shape):
   n_H, n_W = shape
   average = dz/(n_H*n_W)
   a = np.zeros((n_H, n_W)) + average
   
   return a
```
Now we can finally implement `pool_backward` function for both max and average pooling. 

```python
def pool_backward(dA, cache, mode = "max"):
    """
    Args:
    dA -- gradient of cost with respect to the output of the pooling layer, same     shape as A
    cache -- cache output from the forward pass of the pooling layer, contains       the layer's input and hparameters 
    mode -- the pooling mode you would like to use, defined as a string ("max"       or "average")
    
    Returns:
    dA_prev -- gradient of cost with respect to the input of the pooling layer,      same shape as A_prev
    """
    
    (A_prev, hparameters) = cache
    stride = hparameters["stride"]
    f = hparameters["f"]

    m, n_H_prev, n_W_prev, n_C_prev = A_prev.shape
    m, n_H, n_W, n_C = dA.shape

    dA_prev = np.zeros(A_prev.shape)
        
    for i in range(m):
        a_prev = A_prev[i]
        for h in range(n_H):
            for w in range(n_W):
                for c in range(n_C):
                    vert_start = h * stride
                    vert_end = vert_start + f
                    horiz_start = w * stride
                    horiz_end = horiz_start + f
                    if mode == "max":
                        a_prev_slice = a_prev[
                            vert_start:vert_end,
                            horiz_start:horiz_end,
                            c
                        ]
                        mask = create_mask_from_window(a_prev_slice)
                        dA_prev[
                            i,
                            vert_start:vert_end,
                            horiz_start:horiz_end,
                            c
                        ] += mask * dA[i, h, w, c]
                        
                    elif mode == "average":
                        da = dA[i, h, w, c]
                        dA_prev[
                            i,
                            vert_start:vert_end,
                            horiz_start:horiz_end,
                            c
                        ] += distribute_value(da, (f, f))   
    return dA_prev
```

