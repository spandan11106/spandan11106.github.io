---
title: Bidirectional and Deep RNN
enableToc: "true"
order: "8"
---
### Bidirectional `RNN`
The issue with unidirectional `RNN` can be highlighted with the help of some example. 
1. He said, "Teddy bears are on sale!"
2. He said, "Teddy Roosevelt was a great President!"
Here when a `RNN` goes from left to right coming across the word Teddy, it does not know if it is a human name or a toy. This is true for `GRU` as well as `LSTM`. 

To explain bidirectional `RNN` we use a four word input sentence. So as we go forward through as normal `RNN`, the activation are calculated and the output prediction $\hat{y}$ is given. The backward sequence starts by computing the backward activation with $x^{<4>}$ as input and so on we calculate the subsequent backward activation.

So now for the output prediction we calculate it as follows :
$$
\hat{y}^{<t>} = g(W_y[\overrightarrow{a^{<t>}}, \overleftarrow{a^{<t>}}] + b_y)
$$
Here the arrows on top of the activation show whether it is a forward or a backward activation.

We can implement this for `GRU` as well as `LSTM` blocks. 


### Deep RNN
Here what we can do is stack later of `RNN` on top of each other. 
![[Pasted image 20260708230923.png]]

Now let us see how $a^{[2]<3>}$ is computed. 
$$
a^{[2]<3>} = g(W_a^{[2]}[a^{[2]<2>}, a^{[1]<3>}] + b_a^{[2]})
$$
Here we can use `GRU`, `LSTM` and `Bidirectional RNN` also.

Now let us see how we can use this sequence model for natural language processing. This start by us learning about [[word representation | Word representation]]. 