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

