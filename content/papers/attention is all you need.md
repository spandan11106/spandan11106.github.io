---
title: Attention Is All You Need
enableToc: "true"
tags:
  - seedling
  - AIML/attention
---
### Introduction 
`Recurrent models typically factor computation along the symbol positions of the input and output sequences. Aligning the positions to steps in computation time, they generate a sequence of hidden states ht, as a function of the previous hidden state ht−1 and the input for position t.`

Instead of processing the whole sentence at once, an Recurrent Neural Network processes one position at a time. The position becomes the computation step. Here the hidden state refers to the network's memory. This is updated with a function which takes in the previous hidden state $h_{t-1}$ and the input at position $t$. 
$$
h_t = f(h_{t-1}, x_t)
$$
This is time consuming and has memory constraints over large batch examples. 

### Background
`The goal of reducing sequential computation also forms the foundation of the Extended Neural GPU [16], ByteNet [18] and ConvS2S [9], all of which use convolutional neural networks as basic building block, computing hidden representations in parallel for all input and output positions. In these models, the number of operations required to relate signals from two arbitrary input or output positions grows in the distance between positions, linearly for ConvS2S and logarithmically for ByteNet. This makes it more difficult to learn dependencies between distant positions [12]. In the Transformer this is reduced to a constant number of operations, albeit at the cost of reduced effective resolution due to averaging attention-weighted positions, an effect we counteract with Multi-Head Attention as described in section 3.2.`

In an RNN, information must pass through every intermediate position. So if we want to relate the first and the tenth word, we have to go through 9 in between steps.

[[notes/CNNs/index|CNN]] based sequence models replace recurrence with convolutions. But a convolution only sees nearby positions. If we use a kernel of size 4 then each layer communicates with only is neighbor. 

If we take an example of the `ConvS2S` model which uses Linear growth, the number of operations needed to connect two positions grows linearly with distance. `ByteNet` uses Logarithmic growth, which is much better then linear growth. In this every layer can see further than the previous one. Example -
```text
Layer 1 : 1 position away
Layer 2 : 2 position away
Layer 3 : 4 position away
Layer 4 : 8 position away
and so on.
```

So if we want to travel a distance of suppose `1024` then the `ConS2S` model will require `1024` steps but the `ByteNet` model requires `10` steps only.

With self-attention every token can directly attend to every token. Only one operation is need so we get a complexity of $\text{O(1)}$. 

### Model Architecture
`Here, the encoder maps an input sequence of symbol representations (x1, ..., xn) to a sequence of continuous representations z = (z1, ..., zn). Given z, the decoder then generates an output sequence (y1, ..., ym) of symbols one element at a time. At each step the model is auto-regressive [10], consuming the previously generated symbols as additional input when generating the next.`

This statement is pretty self-explanatory. Auto-regressive means to generate the next word, the model uses words it has already generated. When generating $y_t$, the decoder receives:
$$
(y_1, y_2, y_3, ...... , y_{t-1}) 
$$
as input. 

![[Pasted image 20260614040753.png]]

#### Encoder and Decoder Stacks
The encoder is composed of a stack of $N = 6$ identical layers. Each layer has two sub-layers. The first one is a multi-head self-attention mechanism, and the second is a simple, position-wise fully connected feed-forward network. 

Residual connection is used. The output of each sub-layer is 
$$
\text{LayerNorm(x + Sublayer(x))}
$$
So if a layer produces a bad output the traces of the original information are still there in the output. 

In the original paper in order to facilitate these residual connections, all sub-layers in the model, as well as the embedding layers, produce outputs of dimension $d_{model} = 512$.

The decoder is also composed of a stack of $N = 6$ identical layers. In addition to the two sub-layers in each encoder layer, the decoder inserts a third sub-layer, which performs multi-head attention over the output of the encoder stack. Residual connections is also used here in each sub-layer. 