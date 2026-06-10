---
title: Defining Probability
enableToc: "true"
order: "2"
---
Up until now we were assuming equally likely outcomes. But we do not want to assume that things are equally likely and that there are only finitely many possible outcomes. This is where the non-naive definition comes in. 

A probability sample consists of `S` and `P`, where `S` is a sample space, and `P` is a function which takes an event $A \subseteq S$ as input and returns $P(A) \in [0, 1]$ as the output such that 
- $P(\phi) = 0$ and $P(S) = 1$. (Axiom 1) 
- $P( \ \bigcup_{n = 1}^{\infty} A_n \ ) = \sum_{n = 1}^{\infty} P(A_n)$ if $A_1, A_2, A_3 ...., A_n$ are disjoint (non-overlapping). (Axiom 2)

### Properties

- $P(A^c) = 1 - P(A)$ 
	Proof : Using axiom 1 we know that the probability of the whole sample space is `1`. 
	$$
	1 = P(S) = P(A \  \cup \ A^c)
	$$
	Since $A \ \cap \ A^c = \phi$, i.e. they are disjoint, we can use axiom 2 to get,
	$$
	1 = P(A) + P(A^c) \ \ \ \ \ \ \ \therefore P(A^c) = 1 - P(A)
	$$
---

- If $A \subseteq B$, then $P(A) \leq P(B)$ 
	Proof : Now we can see $B$ as the union of $A$ and the region that is not in $A$ but is in $B$. Therefore, 
	$$
	B = A \ \cup \ (B \ \cap \ A^c)
	$$
	where the sets $A$ and $(B \ \cap \ A^c)$ are disjoint sets. Using axiom 2 we can say that 
	$$
	P(B) = P(A) + P(B \ \cap \ A^c) \geq P(A)
	$$
	Since $P(B \ \cap \ A^c) \in [0, 1]$.  

---

- $P(A \  \cup \ B) = P(A) + P(B) - P(A \ \cap \ B)$ 
	Proof : Now here we cannot apply axiom 2 directly since the sets $A$ and $B$ are not disjoint. We can perform `disjointification` (which really is not a term) to do this,
	$$
	P(A \ \cup \ B) = P(A \ \cup \ (B \ \cap \ A^c)) 
	$$
	Now the sets $A$ and $(B \ \cap \ A^c)$ are disjoint, so now we can apply axiom 2 to get
	$$
	P(A \ \cup \ B) = P(A) + P(B \ \cap \ A^c)
	$$
	Now let us add and sub $P(A \ \cap \ B)$ on the R.H.S
	$$
	P(A \ \cup \ B) = P(A) + P(B \ \cap \ A^c) + P(A \ \cap \ B) - P(A \ \cap \ B) 
	$$
	The sets $(B \ \cap \ A^c)$ and $(A \ \cap \ B)$ are disjoint and their intersection gives the set $B$. Hence we can substitute $P(B \ \cap \ A^c) + P(A \ \cap \ B) = P(B)$. Hence,
	$$
	P(A \ \cup \ B) = P(A) + P(B) - P(A \ \cap \ B)
	$$
	This is a simple case of inclusion-exclusion.
	
	$$
	P(A \ \cup \ B \ \cup \ C) = P(A) + P(B) + P(C) - P(A \ \cap \ B) - P(A \ \cap \ C) - P(B \ \cap \ C) + P(A \ \cap \ B \ \cap \ C)
	$$
	We could prove this in the same way as we did it for two sets. In general for `n` events we could write this as follows;
	$$
	P(A_1 \ \cup \ A_2 \ \cup \ ..... \cup \ A_n) = \sum_{j = 1}^{n} P(A_j) - \sum_{i < j} P(A_i \ \cap \ A_j) + \sum_{i < j < k}P(A_i \ \cup \ A_j \ \cup \ A_k) \  - \ ...... + (-1)^{n+1} P(A_1 \ \cap \ A_2 \ \cap \ A_3 \ ..... \cup \ A_n)
	$$
	
	This is the inclusion exclusion principle for `n` events. 


--- 

### deMontmort's Problem 
A standard deck of 52 cards is shuffled and then revealed one card at a time while comparing the position of each card with its original position in an ordered deck. Suppose we win the game when the position matches. 

`n` cards labeled 1, 2, ...... n. Let $A_j$ be the event where the $j^{th}$ cards matches. So we want to find,
$$
P(A_1 \ \cup \ A_2 \ \cup \ ..... \ \cup \ A_n)
$$
Now we will use the inclusion-exclusion principle. First let us find some patterns in this problem. $P(A_j)$ means we want the $j^{th}$ card to match, rest can be in any position so since all position are equally likely we get the probability to be $\frac{1}{n}$. 

Now $P(A_i \ \cap \ A_j)$ means we want the position of two cards fixed and the rest can be in any position they want so we can show this as, 
$$
P(A_j \ \cap \ A_k) = \frac{(n-2)!}{n!} = \frac{1}{n(n-1)}
$$
Similarly, 
$$
P(A_1 \ \cap \ ...... \ \cap \ A_k) = \frac{(n-k)!}{n!}
$$

So we can calculate the probability as
$$
P(A_1 \ \cup \ A_2 \ \cup \ ..... \ \cup \ A_n) = n.\frac{1}{n} - \binom{n}{2}.\frac{1}{n(n-1)} + \binom{n}{3}.\frac{1}{n(n-1)(n-2)}
$$
--- 

$$
P(A_1 \ \cup \ A_2 \ \cup \ ..... \ \cup \ A_n) = 1 - \frac{1}{2!} + \frac{1}{3!} - \frac{1}{4!} + ..... + (-1)^n\frac{1}{n!} 
$$
---

$$
P(A_1 \ \cup \ A_2 \ \cup \ ..... \ \cup \ A_n) \approx 1 - \frac{1}{e}
$$

Now let us look at [[conditional probability | Conditional Probability]] 