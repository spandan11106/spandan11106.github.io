---
title: LSTM
enableToc: "true"
order: "7"
---
In the `GRU` unit we had the memory function value $c^{<t>}$ always equal to the activation value $a^{<t>}$. For `LSTM` that would not be the case. So the equation to find the candidate value becomes
$$
\tilde{c}^{<t>} = \text{tanh}(W_c[a^{<t-1>}, x^{<t>}] + b_c) 
$$
Here we have two update gates to update the value of the memory function. 
$$
\Gamma_u = \sigma(W_u[a^{<t-1>}, x^{<t>}] + b_u)
$$
This is also known as the update gate.
$$
\Gamma_f = \sigma(W_f[a^{<t-1>}, x^{<t>}] + b_f)
$$
is known as the forget gate. 

So we calculate the new value of the memory function as follows :
$$
c^{<t>} = \Gamma_u * \tilde{c}^{<t>} + \Gamma_f * c^{<t-1>}
$$
Also in order to get the new activation value we use a output gate. 
$$
\Gamma_o = \sigma(W_o[a^{<t-1>}, x^{<t>}] + b_o)
$$
$$
a^{<t>} = \Gamma_o * \text{tanh}(c^{<t>})
$$
So in short we have the previous values of the activation and memory cell i.e. $a^{<t-1>}$ and $c^{<t-1>}$ respectively as the input. We use the inputs to calculate the values of all three gate (update, forget, output) and the candidate function. We then use this gate value along with the inputs to calculate the new activation and memory function value. 

Now let us look at [[bidirectional and deep rnn | Bidirectional and Deep RNN]]. 
