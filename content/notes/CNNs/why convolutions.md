---
title: Why Convolutions ?
order: "9"
enableToc: "true"
---
The two main advantages of using convolution layers over fully connected ones are parameter sharing and sparsity of connections

Let us take an example where we want to convert a `32 x 32 x 3` dimension image in a `28 x 28 x 6` dimension one. Here if we use fully connected layers, we will require the weights of the layers to have dimensions `[4704, 3072]` i.e. approximately 14 million parameters. 

If we apply convolution, then if we use `6` filters with `f = 5` then we get only `156` parameters which is comparatively very small. 

- **Parameter sharing** : A feature detector that is useful in one part of the image is probably useful in another part of the image.
- **Sparsity of connections** : In each layer, each output value depends only on a small number of inputs. 

Also since we have less parameters, the network learns even with less training data.