---
title: U-Net Architecture
enableToc: "true"
order: "24"
---
![[Pasted image 20260624040617.png]]

The initial network is like a usual convolutional network. The later part uses transpose convolution layers. To make the network work better we use skip connection from the usual network to the transpose convolution network. This helps the network to learn the fine information about the image. 

This is the `U-Net` Architecture :
![[Pasted image 20260624042427.png]]

- The network features a symmetric, "U"-shaped architecture. The left side acts as an **encoder** (contracting path) that captures contextual information from the input image, while the right side acts as a **decoder** (expanding path) that enables precise localization.
- As the input moves down the encoder, it undergoes repeated standard $3 \times 3$ convolutions and ReLU activations (black arrows) to extract high-level features, followed by **Max Pooling** (red arrows) to progressively reduce spatial dimensions while increasing channel depth.
- The decoder mirrors the encoder, using **Transpose Convolutions** (green arrows) to upsample the feature maps, restoring the spatial dimensions back toward the original resolution of the image.
- The defining feature of U-Net is the horizontal **Skip Connections** (grey arrows). They copy high-resolution, low-level spatial features directly from the encoder and concatenate them with the upsampled features in the decoder. This prevents the loss of fine spatial details (like sharp edges or boundaries) during downsampling.
- At the very end of the network, a $1 \times 1$ convolution (pink arrow) maps the dense feature channels to the desired number of classes, assigning a semantic label to each pixel to generate the final segmented output (as seen in the car example).

Now we can look at the code implementation of [[image segmentation with U-Net | Image Segmentation with U-Net]]. 