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

Now a `GRU` has a gate named Gamma which has value between 0 and 1. The gate is defined as :
$$
\Gamma_u = \sigma(W_u[c^{<t-1>}, x^{<t>}] + b_u)
$$
The job of the gate is to decide when do we update the value of $c^{<t>}$. Also here $\sigma$ denotes the `sigmoid` function. 

So the actual value of $c^{<t>}$ is given by :
$$
c^{<t>} = \Gamma_u * \tilde{c}^{<t>} + (1 - \Gamma_u)*c^{<t-1>}
$$

So in short, we have the previous value of the memory function i.e. $c^{<t-1>}$ and $x^{<t>}$ as the input. By using the inputs we calculate the candidate value to replace the memory function value which is $\tilde{c}^{<t>}$ and the gate Gamma $\Gamma_u$. Using the value of the gate, the candidate value and the previous value we update the new value. 

Of course in practice the gate Gamma would not be exactly 0 or 1 sometimes we will get values in middle as well. Till now we have discussed the simplified version of the `GRU` unit. 

### Full `GRU` unit
So while calculating the candidate value ($\tilde{c}^{<t>}$), we also might find the previous value of the memory function sometimes irrelevant. To make sure that we take this into consideration we use another gate denoted by $\Gamma_r$. So the equation now becomes :
$$
\tilde{c}^{<t>} = \text{tanh}(W_c[\Gamma_r * c^{<t-1>}, x^{<t>}] + b_c)
$$
where $\Gamma_r$ is defined as :
$$
\Gamma_r = \sigma(W_r[c^{<t-1>}, x^{<t>}] + b_r)
$$
We use rest of the equation as mentioned above.

Now along with the `GRU` unit there is another unit called as the [[long short term memory units | Long short term memory unit (LSTM) ]] which perform even better then the `GRU` unit. 