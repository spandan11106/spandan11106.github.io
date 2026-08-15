---
title: Attention Models
enableToc: "true"
order: "13"
---
In standard `RNN` models the encoder first take in the input and afterwards the decoder provides the output. The issue with this setup is that for longer input sentences the encoder has to first memorize the input which leads to lower translation accuracy. As humans while translating we do not remember the whole input sequence at once, we translate the sequence part by part. 

Attention models tend top translate like humans i.e. in parts. Hence we do not see the dip in performance as the input sequence length increases. Let us illustrate the idea of a attention model using a simple example. 

We have the french sentence : `Jane visite l'Afrique en septembre` as the input. We use a bidirectional `RNN` in order to compute some set of features for each of the input words. This features are then fed into a normal `RNN` architecture to give output. 

Now the first word of the translation is `Jane`. In order to do this translation the network only need to look at the first word or some initial part of the input sequence. There is no need to look at the whole sequence. What the attention model would do is compute a set of attention weights which tell us how much attention we should pay to a piece of information. 

When we want to output the first word of the output sequence we have several attention weights. $\alpha^{<1, 1>}$ tells us how much attention should we give to the first piece of information while generating the first word. Similarly $\alpha^{<1, 2>}$ tells us how much attention should we give the second piece of information while generating the first word and so on. So altogether this will tell us exactly the context which is denoted by $C$ that we should be paying attention to, which is the input to the `RNN` unit that is trying to generate the first word. 

In order to avoid confusion we denote the bidirectional `RNN` activation by $a$ and the output generating `RNN` activation by $s$. So for the first output work the network has activation $s^{<0>}$
along with the activation weights. For the second work we use the previous output as input, the new activation $s^{<1>}$ and the attention weight of the second word to generate the second word. This goes on till we generate the `EOS` token. 

### Formulation of the Attention Model

![[Pasted image 20260814103413.png]]

In the above network at each step there are two activation, the forward activation and the backward activation. So at step one we have $\overrightarrow{a^{<1>}}$ the forward activation and $\overleftarrow{a^{<1>}}$ the backward activation. In order to simplify the notation, for a given step $t$ we will denote the activation by $a^{<t>} = (\overrightarrow{a^{<t>}}, \overleftarrow{a^{<t>}})$. 

To avoid confusion we will use the $t'$ for the bi-directional network instead of $t$. The output generating network at time step one will have input activation $s^{<0>}$ and some context $c$ which depends on the attention weights $\alpha^{<1, 1>}$, $\alpha^{<1, 2>}$ and so on until $\alpha^{<1, t'>}$. The context at step 1 is given as :
$$
c^{<1>} = \sum_{t'} \alpha^{<1, t'>} a^{<t'>}
$$
where 
$\alpha^{<t, t'>}$ is the amount of attention $y^{<t>}$ should pay to $a^{<t'>}$. 

Similarly we calculate the second output word and so on. Now we know how the output generating network works by taking the context as input at each time step.  

Now we calculate the attention weight $\alpha^{<t, t'>}$ as : 
$$
\alpha^{<t, t'>} = \frac{\text{exp}(e^{<t, t'>})}{\sum_{t' = 1}^{T_x} exp(e^{<t, t'>})}
$$

One way to calculate the factors $e$ is to use a small neural network. This network is usually of one hidden layer. The input fed to it is $s^{<t-1>}$ the previous step activation of the output generating network and $a^{<t'>}$ the current step activation of the bi-directional network. We trust that gradient descent would learn the correction relation and calculate the appropriate attention weights. 

One downside of the attention model is that it runs in quadratic time. If the input sequence is of length $T_x$ and output token is of length $T_y$ then this model has time complexity $O(T_x * T_y)$.  

Now let us look at the [[transformer network | Transformer Network]]. 