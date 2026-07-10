---
title: Word Representation
enableToc: "true"
order: "9"
---
This helps our model understand that a king is a man and a queen is a women. Basically it helps the model understand the relations between words. 

Till now we have seen how we represent a vocabulary. We represent each word by a one-hot vector. This representation does not help us understand the relation between words. 

A better way to represent words is to use features. We can take about say `300` features and define a vector using them for a word. Suppose we have the word `King`. If one of the features is gender, then for that feature the vector will have a value `-0.95`. Suppose another feature is `Royal` for that value will be high for feature `Poor` it might be low and so on. So each word can essentially be represented as a `300` feature vector.

This features vectors are also called as word embedding. 

### Using Word Embeddings
Word embeddings can be used to analyze large corpus of datasets on the internet. By examining large quantities of unlabeled text, it can tell which words are related and which are not. Here is how we can apply them :
- Learn word embeddings from  large text corpus or download pre-trained embedding online. 
- Transfer embedding to new task with smaller training set. 
- Optional we could continue to fine-tune the word embeddings with new data. 

### Properties of Word Embeddings
One use of word embedding is that if we want to know which word are related to others and how. For example we have man is to women then a king is to what. Now we know here the answer is queen, but how will the model know. 

When we take the difference of the feature vector of man and women, we see that the gender feature value has particularly high value since for both man and women the values are at extreme. Similarly for king and queen we will find this to be true. 
$$
e_{men} - e_{women} \approx e_{king} - e_{?}
$$
So if we solve this we get $e_{?} \approx e_{queen}$. 

Let us see have we can formalize this into an algorithm. So if we thousands of words in order to find the similar word to `king` what we find the similarity for each word and select the word with the highest similarity. 
$$
w : \text{arg max}\{ sim(e_w, e_{king} - e_{men} + e_{women})\}
$$
So the most commonly used similarity function is cosine similarity. It is defined as follows for two vectors $u$ and $v$.
$$
sim(u, v) = \frac{u^{T}v}{\|u\|. \|v\|}
$$
Other similarity function include Euclidean Norm.

### Embedding matrix
If our vocab has 10,000 words and if we use 300 features to define the feature vector, then the embedding matrix will be of size `300 x 10000`, where each columns corresponds to a word. If we want to pick the feature vector of the word `6257`, then we multiply the embedding matrix with a one hot vector at position `6257`.
$$
E.o_{6257} = e_{6257}
$$
Now let us see algorithms which help us in [[learning word embeddings | Learning Word Embeddings]]. 
