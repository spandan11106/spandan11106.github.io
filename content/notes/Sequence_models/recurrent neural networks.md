---
title: Recurrent Neural Networks
enableToc: "true"
order: "2"
---
### Why not use a standard network
The issues with using a standard network are as follows :
- Inputs and outputs can be of different lengths in different examples. 
- Does not share features learned across different positions of text. 

### Recurrent Neural Network
We have a initial activation $a^{<0>}$ which be either a zero vector or a randomly initialized vector. This activation is fed in a 