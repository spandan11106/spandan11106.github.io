---
title: Updates
enableToc: "true"
order: "1"
---
>[!note]
>This note will have its latest changes on the top with data.

### 20th June 2026
Well we have made good progress on the pipeline. The vision analysis, summary and prompt agents are ready. Some test have also been performed, but testing with a real API is still left which I am thinking of doing in the last phase. Also the frontend has changed a lot. Added a dark theme, changed the layout to make it a bit simplistic and minimal. Planning to complete some more work such as adding the Models tab functionality, where we take the API from the user which they want to use. Other then that thinking of building the image generation agent. Will proceed with testing by next week. I want to release a beta version by the end of this month. 

I am thinking of skipping the market analysis agent implementation for now. Will do it in stable release 1. I want a minimal product ready. 
![[Pasted image 20260620145722.png]]

![[Pasted image 20260620145849.png]]
The video analysis and summary fail because there is no API key. 

![[Pasted image 20260620145922.png]]


### 19th June 2026
Huge updates for today. Started with the `frontend` part of the project. Used `claude` design for it. Backend connection are also in place. Some changes that I have to do 
 - The processed frames of the 3D model are not visible. Replace the placeholder gradients to show the images.
 - I think the generation name is taken as input, but is not there in the processed `json` file. I need to fix this. 

Other then this, I think the input processing stuff is done and dusted. I will attach some snaps of the current `UIUX`. Most of it is placeholder information, but it gives a rough idea. 
![[Pasted image 20260619033343.png]]

![[Pasted image 20260619033419.png]]

![[Pasted image 20260619033444.png]]

### 18th June 2026
The input processing part of the pipeline is complete. I have tested it on some of the supported formats, but testing on all format will be required. Initial layout for the project is completed, might need a few tweaks here and there but nothing major. 

Next we will work on setting up the summary agent which gives a short brief of the info we have in hand.   