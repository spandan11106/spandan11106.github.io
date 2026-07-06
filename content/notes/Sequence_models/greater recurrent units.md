---
title: Greater Recurrent Unit (GRU)
enableToc: "true"
order: "6"
---
We already the formula for calculating the activation at any time t of an `RNN`. It is as follows :
$$
a^{<t>} = g(W_a[a^{<t-1>}, x^{<t>}] + b_a)
$$
Now here we take the activation of the previous layer along with the input of the current layer and pass it through a activation function which mostly is `tanh`. Then we use the calculated activation to calculate $\hat{y}^{<t>}$ our output for that layer. 

>[!note]
>I have previously used the term network to word the different layers of a `RNN`. Well technically they can be consider as networks, but the term layer is also not incorrect.

The `GRU` unit is going to have a new variable called `C`, which stands for memory cell. At time `t`, the memory cell will have a value $c^{<t>}$. In the `GRU` unit the values $c^{<t>}$ and $a^{<t>}$ are the same. 

At every time step we are going to consider an overwriting the memory cell with a value $\tilde{c}^{<t>}$. This is going to be a candidate for replacing $c^{<t>}$. 
$$
\tilde{c}^{<t>} = \text{tanh}(W_c[c^{<t-1>}, x^{<t>}] + b_c)
$$
