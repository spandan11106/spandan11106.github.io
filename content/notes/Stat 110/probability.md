---
title: Introduction to Probability
enableToc: "true"
order: "1"
---
### Naive definition of Probability
Before we define this let us see what a sample space and a event mean :
- **Sample space** : A set of all possible outcomes of an experiment. Usually denoted by `S`. 
- **Event** : An event is a subset of the sample space.

The probability of an event `A` is the ratio of the number of favorable outcomes to `A` divided by the number of possible outcomes. 
$$
\text{P(A)} = \frac{\text{Favourable outcomes}}{\text{Possible outcomes}}
$$
Assuming all outcomes are equally likely and that the sample space is finite. 

### Counting
- **Multiplication rule** : If we have a experiment with $n_1$ possible outcomes, and for each outcome of the first experiment, there are $n_2$ outcomes for the second experiment and so on till the $r^{th}$ experiment where there are $n_r$ outcome, then in conclusion there are $n_1n_2.....n_r$ overall possible experiments. 

Example : What is the probability of getting a full house in poker with a hand of 5 
We get 5 cards out of a total deck of 52 cards. The total number of outcomes can be given by : 
$$
\binom{52}{5} 
$$

>[!note]
>This is the binomial coefficient. It is usually denoted by : 
>$$
>\binom{n}{k} = \frac{n!}{(n-k)!k!} \ \ \ \ ; \ \ \ \ 0 \ \text{if k > n}   
>$$
>This can be interpreted as selecting a subset of size `k` from a set of size `n`. This is total outcomes when we select without any order

So now we have the denominator. Now let us focus on the numerator. Let us assume a full house means having `3 7's` and `2 10's`. So we first have `13` options from which we need a `7` and we `4` total cards with `7` on them. So the outcomes with us getting `3 7's` can be given by $13.\binom{4}{3}$. Now we want `2 10's`. Since we have picked `7` from a total of `13` varieties, we have to pick `10` from the remaining `12`. We have `4` total card with `10`, out of which we want `2`. So outcomes with us getting `2 10's` after we get `3 7's` can be given by $12.\binom{4}{2}$. So the total outcomes of us getting a full house are 
$$
13.\binom{4}{3}.12.\binom{4}{2}
$$
So the total probability of us getting a full house is given by 
$$
\text{P(Full House)} = \frac{\binom{52}{5}}{13.\binom{4}{3}.12.\binom{4}{2}} = 0.144\%
$$

Now we choose `k` objects out of `n` without any order, what if we had to select them in order. Let us understand this through a sampling table. 

#### Sampling Table
We want to choose k objects out of n

|                              | $\text{order matters}$ | $\text{order does not matter}$ |
| ---------------------------- | ---------------------- | ------------------------------ |
| $\text{with replacement}$    | $n^k$                  | $\binom{n+k-1}{k}$             |
| $\text{without replacement}$ | $\binom{n}{k}.k!$      | $\binom{n}{k}$                 |

The proof for the total outcomes when we pick with replacement without taking order into consideration is as follows :

This problem is equivalent to finding out the number of ways there are to put `k` indistinguishable particles into `n` distinguishable boxes. We know the answer is $\binom{n+k-1}{k}$, but how we got this is what we are going to prove. 

