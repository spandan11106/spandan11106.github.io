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
Suppose we have $2n$ people, and we have to count how many ways there are to form $n$ partnerships. We can do this by lining up the people in a row and then saying the first two are a pair, the next two are a pair and so on. This over-counts by a factor of $2^n.n!$ since the order of pairs does not matter, nor does order within each pair. 
Alternatively, count the number of possibilities by noting that there are $2n - 1$ choices for the partner of person 1, then $2n - 3$ choices for person 3 and so on.

---

### Question 7
Show that for all positive integers $n$ and $k$ with $n \geq k$,
$$
\binom{n}{k} + \binom{n}{k - 1} = \binom{n+1}{k}
$$
Solution :
Let us prove this algebraically.
$$
\binom{n}{k} + \binom{n}{k-1} = \frac{n!}{k!(n-k)!} + \frac{n!}{(k-1)!(n - k + 1)!}
$$


$$
\binom{n}{k} + \binom{n}{k-1} = \frac{n!}{k!(n-k)!} \bigg[ 1 + \frac{k}{n-k+1}\bigg] = \frac{n!.(n+1)}{k!(n-k)!(n - k +1)}
$$

$$
\binom{n}{k} + \binom{n}{k-1} = \binom{n+1}{k}
$$

---
### Question 8
A certain family has 6 children, consisting of 3 boys and 3 girls. Assuming that all birth orders are equally likely, what is the probability that the 3 eldest children are the 3 girls ?
Solution :

Assume we want to place the 6 children on 6 chairs in the order of oldest to youngest. So now this becomes a simple problem where we want to find the probability that the 3 girls are placed in the first 3 chairs. 

Now total ways to place the 6 children = $6!$ 
Ways in which the first 3 chairs are occupied by girls = $3!.3! = (3!)^2$  

So the probability is
$$
\text{P(3 eldest children are girls)} = \frac{(3!)^2}{6!} = 0.05
$$

---
### Question 9

1. How many ways are there to split a dozen people into 3 teams, where one team has 2 people, and the other two teams have 5 people each?
Solution : Number of ways = $\frac{\binom{12}{2}\binom{10}{5}}{2}$ = $8316$ ways

2. How many ways are there to split a dozen people into 3 teams, where each team has 4 people?
Solution : Number of ways $= \frac{\binom{12}{4}\binom{8}{4}}{3!} = \frac{12!}{4!4!4!3!} = 5775.$ 

--- 
### Question 10
A college has 10 (non-overlapping) time slots for its courses, and blithely assigns courses to time slots randomly and independently. A student randomly chooses 3 of the courses to enroll in (for the PTP, to avoid getting fined). What is the probability that there is a conflict in the student’s schedule?
Solution :

We can look at this as having 10 boxes and 3 particles which we want to place in the boxes. Then we have to find the probability of finding more then one particle in a box. 

Total number of ways = ${10}^3$

 Now there can be two types of conflicts :
 - 2 courses overlap : In this conflict we have to first select the two courses which overlap and then the time slot they are in. The number of ways of doing this is 
 $$
 \binom{3}{2}\binom{10}{2}
 $$
 - 3 courses overlap : In this we just have to select the time slot they are in which can be done in 10 ways.

$$\text{P(Probability of Confilict)} = \frac{3.10.9}{1000} = 0.27$$

--- 
### Question 11
A city with 6 districts has 6 robberies in a particular week. Assume the robberies are located randomly, with all possibilities for which robbery occurred where equally likely. What is the probability that some district had more than 1 robbery?
Solution :

Similar to the previous problem, we can think of the districts as boxes and the robberies as balls. So we have to place 6 balls in 6 boxes and find the probability that a box has more then one ball.

Total number of ways = $6^6$

Now in this problem if we want to find the number of ways which are favorable to us, it would be a lot of them. One way of doing this is finding the ways in which each box has one ball only. 
Number of ways in which each box has only one ball = $6!$
$$
\text{P(One robbery in a district)} = \frac{6!}{6^6} = 0.01543
$$
$$
\text{P(More then one robbery in a district)} = 1 - \text{P(One robbery in a district)} = 1 - 0.01543 = 0.98456
$$

This also means that in 6 rolls of a six sided fair dice, there is a $98\%$ chance of a digit repeating. 

---
### Question 12
Elk dwell in a certain forest. There are N elk, of which a simple random sample of size n are captured and tagged. The captured elk are returned to the population, and then a new sample is drawn, this time with size m. This is an important method that is widely-used in ecology, known as capture-recapture. What is the probability that exactly k of the m elk in the new sample were previously tagged?
Solution :

Total number of ways = $\binom{N}{m}$

Now we want the probability of exactly k of the m elk in the new sample to be tagged. We can think of this as selecting `k` elks from the set of `n` size random sample and the remaining `m - k` elks from the set of size  `N - n`.
Number of ways in which exactly k of the m elk in the new sample were previously tagged = 
$$
\binom{n}{k}\binom{N-n}{m-k}
$$
So the probability is
$$
\text{P(exactly k of the m elk in the new sample were previously tagged)} = \frac{\binom{n}{k}\binom{N-n}{m-k}}{\binom{N}{m}}
$$

for k such that $0 \leq k \leq n$ and $0 \leq m-k \leq N-n$ and is 0 for all other values of $k$. Such probabilities are known as `Hypergeometric` probabilities.

---
### Question 13
A jar contains r red balls and g green balls, where r and g are fixed positive integers. A ball is drawn from the jar randomly (with all possibilities equally likely), and then a second ball is drawn randomly.

1. Explain intuitively why the probability of the second ball being green is the same as the probability of the first ball being green.
Solution :
Intuitively it shouldn’t matter if we pick one ball at a time, or take one ball with the left hand and one with the right hand at the same time. By symmetry, the probabilities for the ball drawn with the left hand should be the same as those for the ball drawn with the right hand. (b) Define notation for the sample space of the probability.

---

2. Define notation for the sample space of the problem, and use this to compute the probabilities from (a) and show that they are the same.
Solution :
Label the balls as 1, 2, ...., g+r, such that 1, 2,..., g are green and g+1, ....., g+r are red. The sample space can be taken to be a set of all pairs $(a, b)$ with $a, b \in \{1, ...., g+r\}$ and $a \neq b$. Each of these pairs are equally likely. Let $G_i$ be the event that the `ith` ball drawn is green. 
The denominator is $(g + r)(g + r -1)$ by the multiplication rule. For $G_1$, the numerator is $g(g+r-1)$. For $G_2$, the numerator is also $g(g+r-1)$, since in counting favorable cases, there are $g$ possibilities for the second ball and for each of those there are $g+r-1$ favorable possibilities for the first ball.  Thus, 
$$
P(G_i) = \frac{g(g+r-1)}{g+r)(g+r-1)} = \frac{g}{g+r}
$$
for $i \in {1, 2}$

---

3. Suppose that there are 16 balls in total, and that the probability that the two balls are the same color is the same as the probability that they are different colors. What are r and g (list all possibilities)?
Solution :
Let $A$ be the event of getting one ball of each color. In set notation, we can write $A = (G_1 \ \cap \ G_2^c) \ \cup \ (G_1^c \ \cap \ G_2)$. We are given that $P(A) = P(A^c)$, so $P(A) = 1/2$. Then 
$$
P(A) = \frac{2gr}{(g+r)(g+r-1)} = \frac{1}{2},
$$
giving the quadratic equation 
$$
g^2 + r^2 -2gr - g -r = 0,
$$
$$
(g - r)^2 = g+r
$$
But $g+r = 16$, so $g - r$ is $4$ or $-4$. Thus, either $g = 10, r = 6$, or $g = 6, r = 10$.

---
### Question 14
Prove that 
$$
\binom{k}{k} + \binom{k+1}{k} + \binom{k+2}{k} + .... + \binom{n}{k} = \binom{n+1}{k+1},
$$
where $n$ and $k$ are positive integers with $n \geq k$. 
Solution :

Imagine arranging a group of people by age, and then think about the oldest person in a chosen subgroup.

Consider choosing $k+1$ people out of a group of $n+1$ people. Call the oldest person in the subgroup "Abby". If Abby is the oldest person in the full group, then there are $\binom{n}{k}$ choices for the rest of the subgroup. If Abby is the second oldest in the full group, then there are $\binom{n-1}{k}$ choices since the oldest person in the full is still not chosen. In general, if there are j people in the full group who are younger than Abby, then there are $\binom{j}{k}$ possible choices for the rest of the  subgroup. Thus,
$$
\sum_{j=k}^n \binom{j}{k} = \binom{n+1}{k+1}
$$


---
### Question 15
Suppose that a large pack of Haribo gummi bears can have anywhere between 30 and 50 gummi bears. There are 5 delicious flavors: pineapple (clear), raspberry (red), orange (orange), strawberry (green, mysteriously), and lemon (yellow). There are 0 non-delicious flavors. How many possibilities are there for the composition of such a pack of gummi bears? You can leave your answer in terms of a couple binomial coefficients, but not a sum of lots of binomial coefficients.
Solution :

For a pack of $i$ gummi bears, there are $\binom{5+i-1}{i} = \binom{i+4}{i} = \binom{i+4}{4}$ possibilities since the situation is equivalent to getting a sample of size i from the $n = 5$ flavors. So the total number of possibilities is 
$$
\sum_{i = 30}^{50} \binom{i + 4}{4} = \sum_{j=34}^{54}\binom{j}{4}
$$
$$
\sum_{j=34}^{54}\binom{j}{4} = \binom{55}{5} - \binom{34}{5}.
$$
(This works out to 3200505 possibilities!)

--- 
