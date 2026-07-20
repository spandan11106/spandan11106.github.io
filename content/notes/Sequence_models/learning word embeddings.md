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

### GloVe Word Vectors
This algorithm is also known as the global vectors for word representation. So again let us use this example :
$$
\text{I want a glass of orange juice to go along with my cereal.}
$$
Now we define a term $X_{ij}$ as the number of times $i$ appears in context of $j$. For the `GloVe` algorithm we define the target to appear in close proximity of the context. Hence we can say for this algorithm :
$$
X_{ij} = X_{ji}
$$
$X_{ij}$ is a count which capture how often do $i$ and $j$ appear close to each other. So the aim of the algorithm is to minimize the following :
$$
\sum_{i=1}^{10,000} \sum_{j=1}^{10,000} f(X_{ij})(O_i^Te_J + b_i + b_j - \text{log}X_{ij})^2
$$
where $f(X_{ij})$ is a weighted term. This term is $0$ when $X_{ij} = 0$. Also this factor is used to normalize certain word appearances. For example words like `this`, `of` etc. appear more and word like `durian` appear less in the English corpus, so this factor tries giving equal compute to both kind of words.

In this algorithm we see that $O_i$ and $e_j$ are symmetric. 

### Debiasing Word Embeddings
Here we will learn how to remove bias as in gender bias, race bias and so on from word embeddings. Word embeddings can reflect gender, ethnicity, age, sexual orientation, and other biases of the text used to train the model. 

Let"s say we already learned word embeddings. The first thing we do is identity the bias direction. For this example we will work with gender bias, but this ideas work for any other bias as well. In order to get the direction we calculate values such as :
$$
e_{he} - e_{she} \ \ \ ; \ \ \ e_{male} - e_{female}
$$
and some more and average them out.

Now for every word that is not definitional, project to get rid of bias. The last step is to make the gender defining words equidistant from their biasing qualities. One example is that the word babysitting is closer to grandma then grandpa. What we could do is place the words grandpa and grandma all equal distance from the perpendicular line passing from the word babysitting. 

Let us see more on [[sequence models | Sequence Models]].