---
title: Face Verification with Binary Classification
enableToc: "true"
order: "29"
---
We can take a Siamese Network and have both the computed embedding and input these into a logistic regression unit to the make a prediction. Where the target output will be `1` if both are the same person and `0` if different people. 

If $\hat{y}$ is the output, then we can define it as :
$$
\hat{y} = \sigma\bigg(\sum_{k=1}^{128} w_k |f(x^{(i)}_k) - f(x^{(j)}_k)| + b\bigg)
$$
In some networks this definition is also used :
$$
\hat{y} = \sigma\bigg(\sum_{k=1}^{128}w_k \frac{(f(x^{(i)}_k) - f(x^{(j)_k}))^2}{f(x^{(i)}_k) + f(x^{(j)_k})}\bigg)
$$

Now that we have covered the mathematics and theory, we can look at the [[code implementation of face recognition | Code Implementation of Face Recognition]]. 

Now let us look at now we can use [[neural style transfer | Neural Style Transfer]] to make artwork. 

