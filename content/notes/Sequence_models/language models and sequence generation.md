---
title: Language Models and Sequence Generation
enableToc: "true"
order: "5"
---
A language model basically calculates the probability of a particular sequence of words. To make a language model using a `RNN` we will require a training set comprising a large corpus of English text or text form of whatever language we want to build the model on. Let's say we get a sentence in our training set as follows, **Cats average 15 hours of sleep a day**.

The first thing we do is tokenize the sentence. We form a vocabulary and then map each of these words to one-hot vectors in the vocabulary. One thing we might also want is our model to know when a sentence ends, so we add a token called `EOS` which stands for end of sentence. If one of the words in not there in out vocab then we use the unique token called `UNK` which stands for unknown words. 

So for the given sentence we have the tokens as follows :
$$
\boxed{Cats}\boxed{average} \boxed{15} \boxed{hours} \boxed{of} \boxed{sleep} \boxed{a} \boxed{day} \boxed{<EOS>}
$$

Now let is see how we can build the `RNN` model

### `RNN` model
We assume that the first activation $a^{<1>}$ and the first input $x^{<1>}$ are both initialized to a zero vector. We then let the network calculate the first word and call this prediction $\hat{y}^{<1>}$. In the second network now, we give the model the input as the first correct word $y^{<1>}$. Then the network calculates $a^{<2>}$ and the second word prediction $y^{<2>}$. Now in the next network where it predicts the third word, we give the second words as the input. 

So in the first network $a^{<0>} = x^{<0>} = \vec{0}$.
$$
a^{<1>} = g(b_a)
$$
$$
\hat{y}^{<1>} = g(W_ya^{<1>} + b_y)
$$
Here we can also denote $\hat{y}^{<1>}$ as the probability of the word `Cats` coming in the sequence $\text{P(Cats)}$. 

Now in the second layer, we take $x^{<1>} = y^{<1>}$ and then perform the calculations. For the third layer we take $x^{<2>} = y^{<2>}$ and so on till we reach the `EOS` token. 

We can treat $\hat{y}^{<2>}$ as the probability of the word `average` given the word `Cats` i.e. $\text{P(average | Cats)}$. Similarly $\hat{y}^{<3>}$ as $\text{P(15 | "Cats average")}$ and finally $\hat{y}^{<9>}$ as $\text{P(EOS | Cats average 15 hours of sleep a day)}$.

So the `RNN` learns to predict one word at a time going from left to right. To train this network we will define a cost function. At a certain time `t`, the elemental loss is 
$$
L^{<t>}(\hat{y}^{<t>}, y^{<t>}) = -\sum_i y_i^{<t>}log(\hat{y_i}^{<t>})
$$
and the overall loss as
$$
L = \sum_{t = 1}^{T_y} L^{<t>}(\hat{y}^{<t>}, y^{<t>})
$$
![[Pasted image 20260705034424.png]]

### Sampling Novel Sequences
In order to sample a sequence we do something different. We perform computations till the first network in the same way as above and get $\hat{y}^{<1>}$. Here the vector $y^{<1>}$ has the same size as the size of the vocab. Each element in this vector gives a probability of the word appearing in the sequence. We randomly sample across this vector say using the `numpy` command `np.random.choice`. 

Now generally as we saw above we used the $y^{<1>}$ as input, but here we use the sampled $\hat{y}^{<1>}$ as the input for the next network. We continue this across the networks until we generate the `EOS` token. 

This process sometimes generates the unknown word token `UNK`, one thing we could do is just reject any sample that comes out as this token and just resample for the rest of the vocab until we get a token which is not the token `UNK`.

### Vocab level
Here in the examples before we had word level vocabulary. We can also have a letter level vocab with all the alphabets, numbers, symbols, capital alphabets and so on.

Such a vocab is only used in specialized applications where we need to have more vocabulary.  

### Vanishing Gradients with `RNNs`
Suppose we have a sentence as follows : **The cat which already ate ........., was full**. 

Now if we had multiple cats then : **The cats which already ate ........., were full**. 

So here our model need to remember that the word `cat` was singular or plural, so as to use the proper word at the end of the sentence. So if the word is near the end of sentence, it is influenced very less by a word which is at the start if the sequence is long.

This is a weakness of the basic `RNN` algorithm. This is a issue of vanishing gradients.

Exploding gradients do not usually occur but when they do we can apply gradient clipping. We look at our gradient vector and if it is bigger than some threshold, we re-scale some of the vectors.

Vanishing gradients is a problem which is much harder to solve. Next we will take a look at [[greater recurrent units | Greater Recurrent Units (GRU)]] which are a very effective solution for addressing the vanishing gradient problem and will allow our `RNN` to capture much longer range dependencies. 
