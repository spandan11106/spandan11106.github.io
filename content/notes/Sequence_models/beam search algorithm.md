---
title: Beam Search Algorithm
enableToc: "true"
order: "12"
---
After the word goes through the encoding network, its final activation goes to the decoding network. This generates the first output prediction $\hat{y}^{<1>}$. We try to evaluate the probability of the first word, give the input sentence. Here we can consider multiple alternatives. 

The Beam Search algorithm has a parameter called $B$, which is called the beam width. So the algorithm not just considers one possibility but considers $B$ at the time. This $B$ words are stored in the computer memory for further calculations. Now beam search considers all this alternatives while calculating the second output prediction $\hat{y}^{<2>}$. For each of the alternative we then calculate the probability of the first two words with respect to the input $x$. 
$$
P(y^{<1>}, y^{<2>} | x) = P(y^{<1>} | x)P(y^{<2>} | x)
$$

We calculate this probability for all the words in the vocab and pick the top three of them. This is done until we get the sentence with highest probability. 

## Refinements

### Length normalization
In beam search at each step we calculate the conditional probability of the words predicted so far with the input sequence. Suppose we have $T_y$ words in the output sequence then :
$$
P(y^{<1>}, y^{<2>}, y^{<3>}, .... , y^{<T_y>} | x) = P(y^{<1>}|x)P(y^{<2>} | x, y^{<1>}).....P(y^{<T_y>}|x, y^{<1>}, y^{<2>}, ..., y^{<T_y - 1>} )
$$
which also can be written as :
$$
\text{arg max}_y\prod_{t = 1}^{T_y} P(y^{<t>} | x, y^{<1>}, y^{<2>}, ..., y^{<t-1>})
$$

The issue with this calculation is that sometimes the probabilities are very small number this might lead too rounding off errors during multiplication. So in practice we calculate the following :
$$
\text{arg max}_y \sum_{y=1}^{T_y} \text{log}P(y^{<t>} | x, y^{<1>}, y^{<2>, ...., y^{<t-1>}})
$$

One more issue with both this calculation is the way longer sequences are treated. As the output sequence becomes bigger probabilities get multiplied which generally leads to a very small number. Same goes with the summation formula since $\text{log}$ of small numbers is negative or small, the sum of longer sequences makes it more negative. 

This gives a undesirable effect of the model choosing only smaller outputs even though they are not that good. So we normalize the summation with length so we get good results. 
$$
\frac{1}{T_y^{\alpha}}\sum_{y=1}^{T_y} \text{log}P(y^{<t>} | x, y^{<1>}, y^{<2>, ...., y^{<t-1>}})
$$
Here $\alpha$ is the hyper-parameter which can be tuned to get good results. 

### How to choose $B$ ??
If we use a large $B$ we get better results but the algorithm is slower. If we choose a small $B$ we might get worse results but it will be fast. Depending on the application we can use $B = 10 \ \text{or} \ 100$. In some research application where we want every bit of performance $B = 1000$ is also used. 

As $B$ increase the increase in quality decreases. Unlike exact search algorithms like `BFS` or `DFS`, Beam Search runs faster but is not guaranteed to find exact maximum. 

### Error Analysis in Beam Search
Beam search is an approximate search algorithm, ​also called a heuristic search algorithm. ​And so it doesn't always output the most likely sentence. ​It's only keeping track of B equals 3 or 10 or 100 top possibilities. 

Suppose while training the network we have a particular example whose best translation we have. The beam search algorithms will might give a translation which is not the best one. Suppose the best translation is given by $y^*$ and the translation given by the beam search is given by $\hat{y}$. We find the probability of both this translations with respect to the input i.e. $P(y^* | x)$ and $P(\hat{y} | x)$ are calculated. 

Here we can have either
$$
P(y^* | x) > P(\hat{y} | x)
$$
or
$$
P(y* | x) \leq P(\hat{y} | x)
$$

Depending on which of these two cases hold true, we will be able to more clearly ascribe this particular error to one of the `RNN` or the beam search algorithm. 

#### Case 1 : $P(y^* | x) > P(\hat{y} | x)$
Here Beam search chooses $\hat{y}$ but $y^*$ attains higher value in probability. It is the job of the search algorithm to provide us the translation with the highest probability, so here we can conclude that Beam search is at fault. 

#### Case 2 : $P(y^* | x) \leq P(\hat{y} | x)$
We know that the translation $y^*$ is better than $\hat{y}$, but the `RNN` model predicts otherwise. So we can conclude that here the `RNN` model is at fault. 

In the error analysis process we go through all the errors in the `dev` set and see whose error it was; beam search error or `RNN` error. Later we figure out what fraction of errors are due to beam search vs. `RNN` model.

Only if we find that beam search is responsible for a lot of errors, then maybe we can increase the beam width. If the model is at fault then we add regularization, get more training data, or try a different architecture.

### Bleu score
One of the issues with translating from one language to another is that we can have more then one valid and equally good translation of the same sentence. If there are multiple great answers we go through somethings called as `BLEU` score. 

What the `BLEU` score does is it scores a machine generated translation. As long as the machine generated translation is pretty close to any of the references provided by humans, then it will get a high `BLEU` score. `BLEU` stands for bilingual evaluation understudy. 

Here we compute modified precision. Let us take a example of uni-grams i.e. single words. For each word of the machine translation we see the maximum number of time it appears in a reference. Suppose the reference is : `The cat is on the mat` and the machine translation is : `The cat the cat mat`. So here the work word cat appears only once in the reference and the word the twice and the work mat once. So the modified precision is $4/5$. 

This process can be repeated for bi-grams i.e. pair of words and so on until n-grams. We denote the modified precision of a n-gram by $P_n$. 

So the combined `BLEU` score of the sentence is :
$$
\text{BP} \times exp\bigg( \frac{1}{k} \sum_{n=1}^{k} P_n\bigg)
$$
Here $BP$ is the Brevity penalty. It turns out that if we have short translations, it is easier to get high precision. 
$$
\text{BP} = exp(1 - \text{reference\_output\_length}/\text{MT\_output\_length})
$$
Also if `MT_output_length > reference_output_length` then $BP = 1$. 

Now let us look at the [[attention model | Attention Model]] which works much better then the standard `RNN` model. 






