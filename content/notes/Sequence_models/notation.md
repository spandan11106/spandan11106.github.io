---
title: Notation
enableToc: "true"
order: "1"
---
Let us take an example to understand the notation. Let us build a sequence model to input a sentence and the model will tell us where the peoples names are in this sentence. This is a problem called Named-entity recognition and is used by search engines for example to index all the people mentioned in the news articles so that they can index them appropriately. 

Suppose we have the input :
$$
\text{x: Harry Potter and Hermione Granger invented a new spell}
$$
then we want a model to output $y$ which has one output per input word and it tells you for each input if the word is a person's name or not. So here the output is :
$$
\text{y: 1 1 0 1 1 0 0 0 0}
$$

Now, the input is a sequence of nine words. We use the notation $x^{<i>}$ to denote the $i^{th}$ word. Therefore in this example $x^{<1>}$ denotes the word $\text{Harry}$. Similarly for the output we use the notation $y^{<i>}$. So here $y^{<1>}$ is used to denoted $1$. 

We use $T_x$ to denote the length of the input sequence and $T_y$ to denote the length of the output sequence. In this case we have $T_x = T_y = 9$. 

Now if we have multiple training examples., in-order to denote the $i^{th}$ examples $t^{th}$ word we use the following notation : $X^{(i)<t>}$. Now different training examples can have different length, so $T_x^{(i)}$ is used to denote the length of the $i^{th}$ example. 

### Vocabulary
So to represent a word in a sentence the first thing we should do is come up with a Vocabulary. Suppose the word Harry appears in position $4075$, Potter in position $6830$ and the word Zulu which is the last word of the dictionary appears at position $10000$. 

Now in order to represent the word Harry, we use one hot representations. Here for $x^{<1>}$, the vector will have all zeros except a $1$ at the $4075$ position. Each word is represented with a $10000$ dimension vector.

So the above input sequence can be shown as 9 one hot encoded vectors of dimension $10000$. 

Now we want this network to learn how to map this input $X$ to the output $Y$. For this purpose we use [[recurrent neural networks | Recurrent Neural Networks]].  