---
title: Recurrent Neural Networks
enableToc: "true"
order: "2"
---
### Why not use a standard network
The issues with using a standard network are as follows :
- Inputs and outputs can be of different lengths in different examples. 
- Does not share features learned across different positions of text. 

### Recurrent Neural Network
We have a initial activation $a^{<0>}$ which be either a zero vector or a randomly initialized vector. This activation is fed in a network which take $x^{<1>}$ as input and gives $y^{<1>}$ as output. The next network which takes $x^{<2>}$ as input and gives $y^{<2>}$ as output also takes in activation $a^{<1>}$ as input so that it has input of its previous network. 

There are several parameters in such a network. $w_{ax}$ which is a parameter used in the input, $w_{ya}$ for the output and $w_{aa}$ for the activation of the previous layers. So a `RNN`  uses information of the previous words of the input sequence to give output of the current word of the input sequence. 

This is also a limitation of `RNNs` as they use information of words they have gone through only. It would be more useful to know  not just information of the previous sequence but also of the later words in the sequence to make a good prediction. 

$$
a^{<0>} \longrightarrow \begin{bmatrix} y^{<1>} \\ \uparrow  \\ \text{Network} \\ \uparrow \\ x^{<1>}\end{bmatrix} \longrightarrow a^{<1>} \longrightarrow \begin{bmatrix} y^{<2>} \\ \uparrow  \\ \text{Network} \\ \uparrow \\ x^{<2>}\end{bmatrix} \longrightarrow \ .... \ \longrightarrow a^{<T_x-1>} \longrightarrow \begin{bmatrix} y^{<T_y>} \\ \uparrow  \\ \text{Network} \\ \uparrow \\ x^{<T_x>}\end{bmatrix} 
$$

Now for a general network we take $a^{<0>} = \bar{0}$. So for the first network the following calculation take place. 
$$
a^{<1>} = g_1(W_{aa}a^{<0>} + W_{ax}x^{<1>} + b_a) 
$$
$$
\hat{y}^{<1>} = g_2(W_{ya}a^{<1>} + b_y)
$$
The activation function usually used to compute $a^{<1>}$ is `tanh` or `ReLU`. Depending on what our output `y` is we use the activation function which fits it. 
- For binary classification we use `sigmoid` activation.
- For k-way classification we use `softmax` activation. 

For the last network we have, 
$$
a^{<t>} = g_1(W_{aa}a^{<t-1>} + W_{ax}x^{<t>} + b_a)
$$
$$
\hat{y}^{<t>} = g(W_{ya}a^{<t>} + b_y)
$$
Now let us simplify the notation a bit.

We can write the equation 
$$
a^{<t>} = g(W_{aa}a^{<t-1>} + W_{ax}x^{<t>} + b_a)
$$
as
$$
a^{<t>} = g(W_a[a^{<t-1>}, x^{<t>}] + b_a)
$$
where we define $W_a = [W_{aa} | W_{ax}]$. Here the matrices are stacked together horizontally. Now let us see now [[backpropagation through time | Backpropagation through time]] occurs. 

