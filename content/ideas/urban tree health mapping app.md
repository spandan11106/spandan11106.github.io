---
title: Urban tree health mapping application
enableToc: "true"
tags:
  - AIML/vision
---
### How I got this idea
So I was basically bored and wanted to do a good project which was in general helpful. Started scrolling on `reddit` and came across [r/arborists](https://www.reddit.com/r/arborists/) (`reddit sure takes you to random places`). Now I will be completely honest with you, I did not know what this word meant at all.

Now I know, thanks to google that : 
$$
\text{Arborist - A specialist in the care of woody plants, especially trees.}
$$

Well explored the `sub-reddit` for a some time. After a hour or so this idea crossed my mind.

### The idea
I am pretty sure that detecting tree diseases at the right time is difficult. In a country like India, with less then 28 trees per person (compared to a global avg of 400+), the need to protect urban forests have never been less. Also the supply of `Arborists` is pretty less. 

So to make things easier, we could make a application (ahh classic). Common citizens like you and me use this application and take photos of trees in our area and post it on the app. The app uses a machine learning model to determine weather the tree it healthy or not, it will detect issues and provide suggestions. We mark the tree with its gps location and area. 

On the `Arborist` dashboard, the person will be able to see that tree marked. The dashboard will show number of critical trees, trees with poor health, ml model confidence, priorities and so more data depending on the area they are from. 

### `Claude` research
Of course I went straight to `Claude` with this idea, here is some of the use full info it gave me. I will just copy paste it (I am lazy):

>[!System-overview]
>A citizen snaps a photo on their phone. The image goes to a backend that runs it through a fine-tuned MobileNet/EfficientNet model, returning one of four health classifications. That result, plus GPS coords and optional notes, lands in a PostGIS database. Arborists see everything on a web dashboard with a priority queue and inspection routing.

![[data_map.png]]

![[user_ui.png]]

![[arborist_ui.png]]

`The ML classification pipeline is the core technical challenge. You'd fine-tune EfficientNet-B0 (lightweight enough to run on a server with modest GPU) on a labeled dataset of tree health images. Four classes: Healthy, Fair, Poor, Critical. The training data is the hard part — you'd need to source it from forestry departments, partner with municipal bodies, or run a data-collection sprint with volunteers. iNaturalist has open image data you can bootstrap with.`

### Work
One of the main bottle necks is the data collection (as pointed by `Claude`). But before we start working, I wanted to know if this will be useful or not. Posted on [r/arborists](https://www.reddit.com/r/arborists/) and [r/trees](https://www.reddit.com/r/Tree/) on the same. Let us see if I get great response or not (not great at the time i am writing this). 

I have also sent mail to [**Amenity Tree Care Association (ATCA)**](https://www.arbindia.com/) - A non-profit organization based in Mumbai regarding feedback on this idea.

Update :- No response will now :(

Update :- So people on `reddit` were not supportive of this idea. I could not find any constructive criticism, just some old `unc` saying that this will just be `AI slop` and will do no help. There was no reply to the mail as well. Why do such organisation do not have the time to at least reply. According to me this was a good idea, helpful also but let us put it on hold for now. 

Update (19th July 2026) :- I got a response to my mail to [**Amenity Tree Care Association (ATCA)**](https://www.arbindia.com/). The director of the association liked the idea, said that machine learning solutions existed but one which in which citizens had a part would be something new. I have connected him on `whatsapp` for further questions about what they would like the project to deliver. 

I think I will start working on this idea. Currently I am working on [[project_logs/pixpilot/index|Pixpilot]], but as soon as it becomes a deliverable product I will start working on this. 
