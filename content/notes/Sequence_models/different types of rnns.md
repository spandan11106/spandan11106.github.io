---
title: Different Types of RNNs
enableToc: "true"
order: "4"
---
### Applications
There are several application of `RNNs` which include sequence data.
- Speech recognition - Input is audio and the output is a sequence of words.
- Music generation - Here the input can be nothing and words which direct the music they can want and the output is the music.
- Sentiment classification - Depending on the review of a particular thing, finding out how much did the user enjoy it. 
- Machine Translation
- Name entity recognition

We could modify the basic `RNN` architecture and use it for any of this problems.

### Different type of Architectures

1. Many-to-many ($T_x = T_y$)
Similar to the example we had taken below, for each input sequence word an output is given and activation are calculated.

2. Many-to-one
In this we can take the example of sentiment classification. Here we put the input token through the network, but at each stage we only calculate the activation and not the output $y$. Then in the final network we calculate the output to give a number between say $0-5$ which is the sentiment of the user where $0$ is bad and $5$ is good.

3. One-to-many
In this we can take the example of music generation. In this network, we use the input only in the first network if there is one and then calculate the outputs. We do not get input in the later networks. We calculate the activation without the inputs for the rest of the layers. It is seem that in such network the output of the previous network is feed as input for the next network for better generation. 

4. Many-to-many ($T_x \neq T_y$)
Here we can take the example of translation from one language to another. Here the input length of one language might have less words then the output length which is of another language. In such case we take a network which first only takes the input one by one giving no output and then the network provides output after all the inputs are taken in. 
Here the part which takes in the input is known as the `encoder` and the other part is known as the `decoder`. 


There are other architectures known as the attention based architectures which we will study later.
![[Pasted image 20260705023638.png]]

Now let us look at how we can use `RNNs` to make [[language models and sequence generation | Language Models and perform Sequence Generation]]. 
