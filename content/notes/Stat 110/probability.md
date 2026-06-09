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

### Sampling Table
We want to choose k objects out of n

|                              | $\text{order matters}$ | $\text{order does not matter}$ |
| ---------------------------- | ---------------------- | ------------------------------ |
| $\text{with replacement}$    | $n^k$                  | $\binom{n+k-1}{k}$             |
| $\text{without replacement}$ | $\binom{n}{k}.k!$      | $\binom{n}{k}$                 |

The proof for the total outcomes when we pick with replacement without taking order into consideration is as follows :

This problem is equivalent to finding out the number of ways there are to put `k` indistinguishable particles into `n` distinguishable boxes. We know the answer is $\binom{n+k-1}{k}$, but how we got this is what we are going to prove. 

Let us take an example to prove this :
We have 4 boxes. The first box has 3 particles, the second has none, the third has 2 particles and the fourth box has one particle. 
$$
\boxed{...} \ \ \  \boxed{} \ \ \ \boxed{..} \ \ \ \boxed{.}
$$
So we have `n = 4` and `k = 6`.

Now we will represent this in a simple code. Instead of drawing the boxes we draw the separators. They can be shown as follows ;
$$
...||..|.
$$
So here we have `3 |` and `6 .`

We can also say that for a general case we have in `(n - 1) |` and `k .` So the total ways we can show this is by deciding `k` places for the `.` and the rest of the places can be directly given to the `|`. Since order does not matter. 

So we want number of ways of choosing `k` places from a total of `n - 1 + k`, which is given by : 
$$
\binom{n + k - 1}{k}
$$

### Some properties 

- **Property 1** : This identity is easy enough to prove by algebra. You can also think of it is this way, we want to pick `k` people out of `n`, we can do this or we can pick `n - k` people out of `n` and keep the rest.
$$
\binom{n}{k} = \binom{n}{n - k}
$$

- **Property 2** : Suppose we want to pick `k` people out of `n`, with `1` designated as the leader. So there are two ways to do this,
     - One, we pick `k` people out of `n` and then pick the leader out of them
     - Two, we pick the leader of of the `n` people and then pick the rest `k - 1` people from the remaining `n - 1` people (since we already picked the leader)
$$
n\binom{n - 1}{k - 1} = k\binom{n}{k}
$$

- **Vandermonde's identity** : Suppose we have to choose `k` people in total out of two groups one of `m` people and other of `n` people. We can choose `j` people from the first group and the remaining `k - j` from the second group where `j` can be any number from `0` to `k`.
$$
\binom{m+n}{k} = \sum_{j = 0}^{k} \binom{m}{j}\binom{n}{k - j}
$$


So now that we have gone through the naive definition of probability, let us go through a better and more [[non naive definition |advance definition of probability]] to understand it better. 

[[birthday problem | A quite famous problem you could see]] 

You can now be able to understand most of the problems solved in [[problem set 1 | Problem Set 1]] 