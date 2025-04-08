---
title: Week 10 - Strudel Musical Pattern Language
---

Today:

* Strudel live coding
* Jam time

<iframe width="560" height="315" src="https://www.youtube.com/embed/Hc-lcAajQxo?si=-RaM-WvahOuDiLvI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/lxQgBeLQBgk?si=V9APdT2rLAutYwM_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Strudel

Strudel is a live coding language to write musical patterns pieces. It is dynamic: you can change or add code and execute the changes in music live instantly. What does it mean that Strudel is used to write musical *patterns*? If you have previous experience working in music hardware, you can consider Strudel to be like a *sequencer.* It is typical to start with minimal code and make a simple loop that over time you morph, add new beats, instruments or additional sequences.

Strudel (Javascript), and its sibling languages Tidal (Haskell) and Vortex (Python), are used in algorave algorithmic music performance, often alongside live coded visuals in other languages. Strudel is based on the original language TidalCycles (also known as Tidal), implemented in Javascript, whereas Tidal was written in the language Haskell. Consider this similarity to how p5.js is a Javascript implementation of the Processing functionality that was written in Java.

Strudel is open source, created by Felix Roos and Alex McLean with many other contributors, and is based on the work of TidalCycles, created by Alex McLean.

### Introduction to Strudel

*Credits: This tutorial section includes code and descriptions adapted from [Antonio Roberts](https://www.hellocatfood.com/)'s Make Music Through Code Using Strudel.*

Visit the [Strudel REPL](https://strudel.cc/) to get started. You can try playing the pattern there, or hit shuffle (button in top right) to try another one out.

Instead of clicking the play button you can press Control-Enter to play your current code. Alternatively, it may be Command-Enter on your computer if you have Mac?

A REPL stands for Read-Evaluate-Print-Loop. A command line shell is in a REPL. Here, the REPL allows us to read our code, evaluate (run it), print (aka play it), and then loop - start again.

## Building patterns

The basic building block in Strudel is the pattern. A pattern is a series of events over a timespan.

Let's build up some basic sounds. Start by removing all the starter code in Strudel so you have an empty editor.

```
sound("bd")
```

Enter the code and press Control-Enter to run it. It will play the bd (**bass drum**) sound, then loop back to start and begin playing it again.

A shortcut: **you can write `s()` instead of `sound()`**.

So the above could also be written `s("bd")`.

```
sound("bd bd bd bd")
```

What happens if you repeat the bass drum 4 times? (Hit Control-Enter to run it.)

```
sound("bd bd [bd bd] bd")
```

Notice that with the square brackets the bass drum is played twice on the third step.

```
sound("bd hh [cp cp] bd")
```

Now let's try some other samples. cp is **clap** and hh is **hi hat**.

![drumset, from Strudel, original image by [pbroks13](https://de.wikipedia.org/wiki/Schlagzeug#/media/Datei:Drum_set.svg)](drumset.png)

## Other built-in samples

| Drum        | Abbreviation |
| ----------  | ------------ |
| Bass drum   | bd           |
| Snare drum  | sd           |
| Rimshot     | rim          |
| Clap        | cp           |
| Close hihat | hh           |
| Open hi-hat | oh           |
| Crash       | cr           |
| Ride        | rd           |
| High tom    | ht           |
| Medium tom  | mt           |
| Low tom     | lt           |

Try some of those out.


```
sound("bd hh [cp cp] bd").slow(2)
```

We can chain the sound function to the slow() function to alter the speed of playback. Here our pattern will start playing back at half the speed.

```
sound("bd hh [cp cp] bd").fast(2)
```

We can also play twice as fast with the fast() function.

```
x=>x
```

We use the `x=>x` function before any function that will modify a following pattern.

```
sound("bd hh [cp cp] bd").lastOf(4, x=>x.fast(2))
```

For example, by chaining to the lastOf() function, we can specify that every 4th iteration the pattern should run twice as fast.

```
sound("bd hh [cp cp] bd").lastOf(4, x=>x.rev())
```

You can also run your pattern backwards with the function rev(). Here we run the pattern back every 4 iterations.

```
sound("bd hh [cp cp] bd").speed(0.5).lastOf(4, x=>x.rev())
```

Change pitch with the speed() function. 0.5 is half speed for example.

## Other samples to try

Check out the [Dirt-Samples repo](https://github.com/tidalcycles/Dirt-Samples). Each of the directories is a sample set you can run.

### Add samples

```
samples('github:tidalcycles/Dirt-Samples/master/')
```

Run this to add a large library of sound samples.

```
sound("bd hh [cp cp] bd").bank("RolandTR808").bank("RolandTR808")
```

Change sound bank. Also try the following banks. These are just a few:

* AkaiLinn
* RhythmAce
* RolandTR808
* RolandTR707
* ViscoSpaceDrum
    
[Additional info on Samples and Sound banks](https://strudel.cc/learn/samples/) 

```
samples('github:tidalcycles/Dirt-Samples/')
sound("breaks125").slice(8, "1 1 2 3 [4 0] 5 6 7")
```

slice chops a sample into specified number of slices, which you can then play in a pattern. In the above example, breaks165 sample is chopped into 8 slices, and then played starting at 0. Try changing out breaks165 for breaks125.

```
sound("bd bd hh bd").degradeBy(0.5)
```

degradeBy is the chance that a step in the pattern is skipped. In the above pattern each step has a 50% chance of being skipped.

```
sound("bd cp bd hh").sometimesBy(0.5, x=>x.speed(0.5))
```

sometimesBy randomly applies a function to a pattern with the percentage chance specified.


Check out the strudel [docs](https://strudel.cc/workshop/getting-started) 

For next steps, I recommend checking out [First notes](https://strudel.cc/workshop/first-notes/) and [First effects](https://strudel.cc/workshop/first-effects/).

## Resources

* [Getting Started with Strudel](https://strudel.cc/workshop/getting-started/)
* [Eulerroom](https://www.youtube.com/@Eulerroom) recordings of live coding streamed live on YouTube
* [Integrating Hydra with Strudel](https://strudel.cc/learn/hydra/) to do audio visualizations.

## Live coding collaboration in the browser with Flok

[Flok](https://flok.cc) is a browser-based environment for collaborative live coding of sound and image. It allows mulitple people to work in the same virtual space. You can start up Strudel, Hydra and other live coding languages simultaneously. It supports a [large number of live coding languages and plugins](https://github.com/munshkr/flok?tab=readme-ov-file#features). Flok is [open source software](https://github.com/munshkr/flok) by Damián Silvani and additional contributors.

* alt/option enter - Evaluate all
* ctrl/cmd enter - Evaluate block, Evaluate selection

* [list of keyboard shortcuts (keybindings)](https://github.com/munshkr/flok?tab=readme-ov-file#keybindings)

# Homework

Partner with someone from class. Practice a set performing together. It usually makes sense to have one person perform music while the other performs visual live coding, but it is okay to deviate from this.

Come up with your performance names (or 'band' name). Develop some little code snippets you can use and understand. Practice a short set. Can you build from a minimal start, adding complexity, changing patterns, and building to a climax, before winding down? 
