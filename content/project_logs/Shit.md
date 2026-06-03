---
title: Coding Projects Basics
enableToc: "true"
tags:
  - AIML
---
This file has some important stuff and cmd that I might forget and are quite important when my system breaks or when working on projects.
**Important info :**
```
Operating System - Omarchy 3.8.2
WM - Hyprland 0.55.2 (Wayland)
Terminal - alacritty 0.17.0
Shell - zsh
```
This is my current system stats. Hopefully they stay the same for a while (I just changed my OS 3 hours 44 mins ago)

**Note to me :** If things break remember the system uses `omarchy` zsh

### All conda env 
- ml (The name says it) : Mostly has machine learning dependencies. It has the following
```
numpy, panda, matplotlib, tensorflow, notebook, jupyerlab, pytorch, datasets, huggingface_hub
```
### Package managers
- `uv`,  `pip` and `conda` for python
- `npm` and `fnm` for typescript
- `cargo` for rust
- `pacman`/`yay` for arch 

While using `conda` for an environment, use `conda` for all packages in that environment. Mixing `pip install` into a conda env causes dependency conflicts that are painful to debug.

### Lockfiles

A lockfile pins every dependency (including transitive ones) to exact versions. This guarantees reproducibility: anyone who installs from the lockfile gets exactly the same packages.

Commit your lockfile to git. When someone clones the repo, they install from the lockfile and get identical versions.

### Docker
Docker wraps your code, runtime, libraries, and system tools into an isolated unit called a container. Think of it as a lightweight virtual machine, except it shares the host OS kernel instead of running its own, so it starts in seconds instead of minutes.

### Datasets
```python
from datasets import load_dataset

dataset = load_dataset("imdb")
print(dataset)
print(dataset["train"][0])
```

If the dataset is too large, we use streaming which loads it line by line
```python
dataset = load_dataset("wikimedia/wikipedia", "20220301.en", split="train", streaming=True)

for i, example in enumerate(dataset):
    print(example["title"])
    if i >= 4:
        break
```

To convert the dataset to other format we use the following :
```python
dataset = load_dataset("imdb", split="train")

dataset.to_csv("imdb_train.csv")
dataset.to_json("imdb_train.json")
dataset.to_parquet("imdb_train.parquet")
```
How to split the data :
```python
dataset = load_dataset("imdb", split="train")

split = dataset.train_test_split(test_size=0.2, seed=42)
train_val = split["train"].train_test_split(test_size=0.125, seed=42)

train_ds = train_val["train"]
val_ds = train_val["test"]
test_ds = split["test"]

print(f"Train: {len(train_ds)}, Val: {len(val_ds)}, Test: {len(test_ds)}")
```
Always set a seed for reproducibility. The same seed produces the same split every time.

