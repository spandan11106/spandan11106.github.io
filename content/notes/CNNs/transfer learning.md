---
title: Transfer Learning
order: "15"
enableToc: "true"
---
We use networks trained by other for our work. Then we can find tune the network for our use case. 

One way of doing this is to freeze the weight of most of the layers and just train the output layer weights. We could also do is train only the last few layer or replace these layers with other layers. This all depends on the amount of data we have. If we have less data, we could just train the output layer, but if we have more data we could train the last few layers. 

One way to get more data is data augmentation

### Data Augmentation
We basic method is mirroring and random cropping. Other things which we can do is rotating, shearing and local warping. We could also do color shifting by changing the color scheme. 

One of the algorithm used for color shifting is `PCA` color augmentation.

So other things to improve performance on benchmarks
- Ensembling : Train several networks independently and average their outputs.
- Multi-crop at test time : Run classifier on multiple versions of test images and average results

Let us see the [[code implementation of residual networks | Code Implementation of Residual Networks]]  