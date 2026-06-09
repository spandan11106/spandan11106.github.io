---
title: The Birthday Problem
enableToc: "true"
---
### Using the naive definition of probability
If we have `k` people then we want to find the probability that at-least 2 have the same birthday. 

Before we solve this problem we are going to make some assumptions :
- We are going to exclude Feb 29th
- The other 365 days are equally likely
- Independence of birth (i.e. we ignore twins)

If `k` is `365` then the probability is `1`. 
Now if `k` is less then `365` then,
- Let us find the probability of finding no match in birthdays. So as for the denominator each person has a choice of `365` days, if we have `k` people, then in total we have $365^k$ choices. Now since we are calculating the probability of no match, if the first person has `365` choices, then the second person must have `364` choices and so on till the $k^{th}$ person has `365 - k + 1` choices. 
$$
\text{P(no match)} = \frac{365.364.363......(365 - k + 1)}{365^k}
$$

- For finding the probability of matching birthday, we must subtract the above probability from `1`
$$
\text{P(match)} = 1 - \text{P(no match)} = 1 - \frac{365.364.363......(365 - k + 1)}{365^k}
$$
By mathematical approximation we get :
$$
\text{P(match)} \approx 1 - e^{-k(k-1)/730}
$$
If we plug in `k = 23` in this formula we get a probability of $50\%$. 
If `k = 50` then the probability is $96.513\%$ and if `k = 100` then it is $99.999\%$. 

This result is counter-intuitive. To get some intuition, think of it as choosing a pair from `k` people that is $\binom{k}{2}$ choices. So if we have `23` people there can be `253` pairs and now it seems to be possible that at least one of this pair has the same birthday. 
