---
title: Problem Set 1
enableToc: "true"
order: "1"
---
### Question 1
For each part, decide whether the blank should be filled in with =, <, or >, and give a short but clear explanation.

1.  (probability that the total after rolling 4 fair dice is 21) ___ (probability that the total after rolling 4 fair dice is 22)
Solution :
In order to get a sum of 21, with 4 dice we can have (6, 6, 6, 3), (6, 6, 5, 4) and (6, 5, 5, 5). Number of ways to get (6, 6, 6, 3) is equal to $1.1.1.\binom{4}{1} = 4$. Similarly for (6, 5, 5, 5) there are $4$ ways. For (6, 6, 5, 4) there are $4!/2 = 12$ ways. So in total to get a sum of 21 on 4 fair dice there are `20` ways.
Similarly for a sum of 22, we can have (6, 6, 6, 4) and (6, 6, 5, 5) where the number of ways are $4$ and $4!/4 = 8$ respectively. So in total to get a sum of 22 on 4 fair dice there are `10` ways. 
Therefore,
(probability that the total after rolling 4 fair dice is 21) __>__ (probability that the total after rolling 4 fair dice is 22)

---

2. (probability that a random 2 letter word is a palindrome) ___ (probability that a random 3 letter word is a palindrome)
Solution :
Here it should be clear that this probability are equal.
(probability that a random 2 letter word is a palindrome) = (probability that a random 3 letter word is a palindrome)

---

### Question 2
A random 5 card poker hand is dealt from a standard deck of cards. Find the probability of each of the following (in terms of binomial coefficients).

The total ways of taking 5 cards out of 52 = $\binom{52}{5}$. 

1. A flush (all 5 cards being of the same suit; do not count a royal flush, which is a flush with an Ace, King, Queen, Jack, and 10)
Solution: 
In order to select a flush, we first need to select a suit. Here are 4 ways of selecting a suit. Now each suit has 13 cards out of which we want only 5, so there are $\binom{13}{5}$ ways of doing this. So in total there are $4.\binom{13}{5}$ ways of selecting a flush. But we do not want a royal flush. Each suit has 1 royal flush, there we subtract 4 from the total ways to select a flush. Hence the probability of us getting a flush is 
$$
\text{P(Flush)} = \frac{4.\binom{13}{5} - 4}{\binom{52}{5}} = 4\frac{\binom{13}{5} - 1}{\binom{52}{5}}
$$

---

2. Two pair (e.g., two 3’s, two 7’s, and an Ace)
Solution : 
Out of the 13 ranks we have we have to choose 2 for the pairs which we can in $\binom{13}{2}$ ways. Then we can select the suits for each pair in $\binom{4}{2}$. For the 5th card of the hand, we have 52 - 8 = 44 options left. So the probability of us getting a two pair is
$$
\text{P(Two Pair)} = \frac{\binom{13}{2}.\binom{4}{2}^2.44}{\binom{52}{5}}
$$
---

### Question 3

1. How many paths are there from the point (0, 0) to the point (110, 111) in the plane such that each step either consists of going one unit up or one unit to the right?
Solution :
At any block we have a choice to go one unit up which we will indicate by `U` or one unit right which we will indicate by `R`. So in total we have to perform `110 U's` and `111 R's`. So the total number of operation we perform is `221`. 
Now we can think of this as we have `221` places where we must fit the `U` and `R`. The order matter here or we would have only `1` path. So if we pick the `110` place for `U's` we will give the remaining places to `R's`. 
So the total number of paths is given by 
$$
\binom{221}{110}
$$

---

2. How many paths are there from (0, 0) to (210, 211), where each step consists of going one unit up or one unit to the right, and the path has to go through (110, 111)?
Solution :
There are $\binom{221}{110}$ paths to (110, 111), as above. From there, we need `100 U's` and `100 R's` to get to (210, 211), so the total number of paths is
$$
\binom{221}{110}.\binom{200}{100}
$$

---

### Question 4
A `norepeatword` is a sequence of at least one (and possibly all) of the usual 26 letters a,b,c,. . . ,z, with repetitions not allowed. For example, “course” is a `norepeatword`, but “statistics” is not. Order matters, e.g., “course” is not the same as “source”

A `norepeatword` is chosen randomly, with all `norepeatwords` equally likely. Show that the probability that it uses all 26 letters is very close to 1/e.

Solution :
Now first we need to find the total number of `norepeatword` words. The max size of a `norepeatword` is 26. Let us start with size 1, where we have 26 ways to choose. For size 2 we have 26 ways for the first letter and 25 for the second. Now we multiply this by 2 because order matters. Therefore for size 2 there are $26.25.2$ ways. 

The total number of `norepeatword` are given by:
$$
\sum_{k = 1}^{26} \binom{26}{k}k!
$$
Now we want to find total `norepeatword` with 26 letters in them. This can be simply $26!$

So the probability is 
$$
P = \frac{26!}{\sum_{k = 1}^{26} \binom{26}{k}k!} = \frac{26!}{\sum_{k = 1}^{26} \frac{26!}{k!(26-k)!}k!} = \frac{1}{\frac{1}{25!} + \frac{1}{24!} + .... + \frac{1}{1!} + 1} \approx \frac{1}{e}
$$

---

### Question 5
Prove that $\sum_{k = 0}^n \binom{n}{k} = 2^n$

Solution :
Suppose we have to pick `k` people from a set of `n` people. There are in total $\sum_{k = 0}^n = 2^n$ ways of doing this. On the other hand there are $2^n$ subsets by multiplication rule. 

---

### Question 6
Prove that $\frac{(2n)!}{2^n.n!} = (2n - 1)(2n - 3)....3.1$ 

Solution: 
