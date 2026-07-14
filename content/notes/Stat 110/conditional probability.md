---
title: Conditional Probability
enableToc: "true"
order: "3"
---
### Independence
If we have two events `A` and `B`, the they are independent if $P(A \ \cap \ B) = P(A)P(B)$. Now for 3 events `A`, `B` and `C` are independent if 
$$
P(A, B) = P(A)P(B),\  P(A,C) = P(A)P(C),\  P(B,C) = P(B)P(C),\  P(A, B, C) = P(A)P(B)P(C)
$$  
This is true for any number of events. 

### Newton-Pepys problem
We have a fair six sided dice, then which of the following is most likely ?
A.  at least one 6 with 6 dice.
B.  at least two 6's with 12 dice.
C.  at least three 6's with 18 dice.

Solution :
$$
P(A) = 1 - \bigg(\frac{5}{6}\bigg)^6 = 0.66510
$$

$$
P(B) = 1 - \bigg(\frac{5}{6}\bigg)^{12} - 12\bigg(\frac{1}{6}
\bigg)\bigg(\frac{5}{6}\bigg)^{11} = 0.6186
$$

$$
P(C) = 1 - \bigg(\frac{5}{6}\bigg)^{18} - \binom{18}{1}\bigg(\frac{1}{6}\bigg)\bigg(\frac{5}{6}\bigg)^{17} - \binom{18}{2}\bigg(\frac{1}{6}\bigg)^2\bigg(\frac{5}{6}\bigg)^{16} = 0.597
$$


In general if we want to have at least `k` six's with `n` dice there we can use the binomial probability of the form 
$$
1 - \sum_{j = 0}^{k-1} \binom{n}{j}\bigg(\frac{1}{6}\bigg)^{j}\bigg(\frac{5}{6}\bigg)^{n-j} 
$$


### Conditional Probability 
Definition : 
$$
P(A|B) = \frac{P(A \ \cap \ B)}{P(B)},\ \text{if} \  P(B) > 0
$$
**Intuition** : Pebble world
![[Pasted image 20260611190446.png]]
There are a total of 9 pebbles in the sample space. For ordinary probability of an A it is 
$$
\text{P(A)} = \frac{\text{pebbles in A}}{\text{total pebbles}} = \frac{3}{9} = \frac{1}{3}
$$
When we have to find $P(A|B)$, we are saying that assume we already know that B happened. This means throw away all pebbles outside B. The remaining pebbles are the only possibilities left. Since probabilities must still add up to 1, **renormalize** the probability mass over the surviving pebbles.

So the new universe becomes just the circle B/
Now the question becomes:  Among the pebbles that survived inside $B$, what fraction are also in $A$?
That is, 
$$
\text{P(A|B)} = \frac{\text{pebbles in } A \ \cap \ B}{\text{pebbles in B}}
$$
In this case we get 
$$
P(A|B) = \frac{1}{4}
$$

#### Theorems
- $P(A \ \cap \ B) = P(B).P(A|B) = P(A).P(B|A)$ 

- $P(A_1, .... , A_n) = P(A_1)P(A_2|A_1)P(A_3|A_1, A_2)....P(A_n|A_1, .... , A_n)$ 

- $P(A|B) = \frac{P(B|A).P(A)}{P(B)}$. This is also known as `Bayes Rule`

### Some Problems
