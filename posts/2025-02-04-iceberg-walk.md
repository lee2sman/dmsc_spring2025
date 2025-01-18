---
title: Week 2 - p5.js Overview and A Random Walk
---

![An iceberg's meandering path](iceberg.jpg)
*Image uploaded to Are.na by Jon-Kyle Mohr*

## Today

- Randomness
- p5.js overview
- Iceberg activities
- HW: Devlog 2

## Javascript!

- [p5.js](https://p5js.org) is a Javascript Library
- it is a reimplementation of Processing for the web
- In addition to the Processing drawing commands it also has commands that take advantage of the medium of the web browser (accessing and modifying web pages, for example)
- It is very similar to Processing (Java) but there are differences because it is based on Javascript - see [Transitioning from Processing tutorial](https://github.com/processing/p5.js/wiki/Processing-transition)

## Program flow

- [Web Editor](http://editor.p5js.org)
  - register and make an account

### A basic p5 `sketch`

```
//this is a comment

function setup(){
  createCanvas(500,500);
}

function draw(){
    //main loop
    //each run of draw is a frame
}
```

### variables

Javascript is [weakly typed](https://en.wikipedia.org/wiki/Strong_and_weak_typing)

```
var x = 0;
let y = 0;
```

### functions

We covered setup and draw. There is also

```
function mousePressed(){}

function keyPressed(){}

function keyTyped(){}
```

##### Working with media (images, sound, etc)

```
function preload(){
  //load media here
  img = loadImage('assets/quality_meme.jpg');
  }  
```

[Example code - preloading an image](http://alpha.editor.p5js.org/2sman/sketches/HytoGD7vm)

### Input

```
ellipse(mouseX,mouseY,20);
```

Keypresses, mouse movement and clicks are examples of input and interaction

### Looping

Similar to Processing/Java

```
for (var i = 0; i < 10; i++){
  print(i)    // will print 1, 2, 3...to 9 on separate lines
}
```

Don't forget you may see ```let``` instead of ```var```


### arrays

Arrays can be described literally. They always start with 0.

```
let array = ['zeroeth','first','second','last'];

console.log(array[0]); //will print zeroeth to console
```

##### Add to the end of an array with push

```
let numArray = [0, 1, 2];

array.push(3);
array.push(4);
console.log(array); //will result [0, 1, 2, 3, 4]
```

##### Remove from end of array with pop

```
//continuing from above
array.pop();
console.log(array); //will result [0, 1, 2, 3]
```

# Debugging and the console

### Accessing the Console

![Accessing the console](devtools.png)

Code examples in p5js can be found [here](../basicExamples.md)

## Next steps:

- Review the [Transitioning from Processing tutorial](https://github.com/processing/p5.js/wiki/Processing-transition)
- Running p5js sketches locally and setting up your editor

## Icebergs and Random Walks


Satellite video of world's biggest iceberg, A23a, breaking free

<iframe id="jw_embed" width="600" height="338" src="https://www.npr.org/embedded-video?storyId=nx-s1-5234100&mediaId=nx-s1-5234100-100&jwMediaType=null" frameborder="0" scrolling="no"></iframe>
*from [NPR](https://www.npr.org/2024/12/20/nx-s1-5234100/worlds-largest-iceberg-a23a-antarctica-breaks-free-floating)*

![Iceberg A68a](iceberg-alley.jpg)  
*from [SciTechHub](https://scitechdaily.com/how-the-worlds-largest-iceberg-escaped-an-ocean-whirlpool/)*  

> When icebergs break away from ice shelves or large glacier fronts, they become travelers in the ocean, carried by currents, spinning in eddies, shifting with the tides, and pushed along by the wind. Sometimes, these massive ice chunks get stuck — either grounded on a shallow seafloor or caught in a swirling mass of water. Iceberg A-23A experienced both.
> While every iceberg’s journey is unique, most follow the same general path. More than 90 percent of bergs around Antarctica enter the clockwise-flowing current of the Weddell Gyre off East Antarctica and eventually escape, shooting north along the Antarctic Peninsula and finally out across the Drake Passage into warmer South Atlantic waters—an ocean route known as “iceberg alley.”
--*How the World’s Largest Iceberg Escaped an Ocean Whirlpool, from [SciTechDaily](https://scitechdaily.com/how-the-worlds-largest-iceberg-escaped-an-ocean-whirlpool/)*

## Perlin Noise

> Returns random numbers that can be tuned to feel organic.

> Values returned by random() and randomGaussian() can change by large amounts between function calls. By contrast, values returned by noise() can be made "smooth". Calls to noise() with similar inputs will produce similar outputs. noise() is used to create textures, motion, shapes, terrains, and so on. Ken Perlin invented noise() while animating the original Tron film in the 1980s.
> noise() always returns values between 0 and 1. It returns the same value for a given input while a sketch is running. noise() produces different results each time a sketch runs. The noiseSeed() function can be used to generate the same sequence of Perlin noise values each time a sketch runs.
> The character of the noise can be adjusted in two ways. The first way is to scale the inputs. noise() interprets inputs as coordinates. The sequence of noise values will be smoother when the input coordinates are closer. The second way is to use the noiseDetail() function.
> The version of noise() with one parameter computes noise values in one dimension. This dimension can be thought of as space, as in noise(x), or time, as in noise(t).

*from [noise](https://p5js.org/reference/p5/noise/) in the p5.js reference, along with great code examples*

### Perlin noise videos

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZoqPQ0sFo6A?si=yAsikXvi8hQ-zYTH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

How to Code Procedural Terrain with Perlin Noise (JavaScript & p5.js) with RachelfTech

[link to code repo](https://github.com/RachelfTech/procedural-terrain-generation)

<iframe width="560" height="315" src="https://www.youtube.com/embed/Qf4dIN99e2w?si=RI8HcaId4WIU18nI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>  

Perlin Noise in p5.js with The Coding Train


