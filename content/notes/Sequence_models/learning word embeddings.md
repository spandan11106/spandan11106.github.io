---
title: Learning Word Embeddings
enableToc: "true"
order: "10"
---
Let us see one of the algorithms with the help of an example. We have a sentence and its words are defined in a vocab. 
$$
\text{I want a glass of orange \_\_\_\_}
$$
Here each word has its position in the vocab. To learn the embedding we do the following :
- We define the one hot vector of each word. Here for $\text{I}$ it can be $o_{4343}$ and so on for each word.
- We multiply this with the embedding matrix which is made of parameters. This gives us the embedding vector $e_{4343}$.
- We do this for all words and get the corresponding embedding vectors. We feed all this vectors to a neural network layer. Later this layer is connected to a `softmax` layer to give the output prediction.

We use back propagation to update the parameters. This method gives us decent word embeddings.

### Word2Vec
Let us take an example of a longer sentence. 
$$
\textbf{I want a glass of orange juice to go along with my cereal.}
$$
So the main objective of this algorithm is to learn the mapping from some Context `c` such as the word `orange` to some target `t`, which might be the word `juice`. So here is what we do :
$$
o_c \rightarrow E \rightarrow e_c \rightarrow softmax \rightarrow \hat{y}
$$
Here $o_c$ is the one hot vector of the context. We can define the model in more detail as follows :
$$
\text{Softmax: } p(t|c) = \frac{e^{o_t^T o_c}}{\sum_{i = 1}^{10,000} e^{o_i^To_c}}
$$
The loss function would be as usual for the `softmax` function. The issue with this current model is the compute cost of performing `softmax`. In this case we use Hierarchical `softmax`. 

### Negative sampling
Here what we do is have a context word say `orange` and pick the words on random and then say weather they can be the target word or not. In the data set it can be shown that `orange` and `juice` pair are marked as 1. `orange` and `king` pair is marked as 0.

So we do pick a context word and do this for `k` times and label each example. We choose larger `k` (5-20) for smaller datasets ad a smaller `k` (2-5) for larger datasets. 
![[Pasted image 20260715040724.png]]

We define the model as follows :
$$
P(y = 1 | c, t) = \sigma(o_c^T e_c)
$$
We have the ratio of positive to negative example as `1 : k`. 

Now let us look at [[sentiment classification | Sentiment Classification]]. 