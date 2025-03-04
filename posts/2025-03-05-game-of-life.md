---
title: Week 6 - Cellular Automata and the Game of Life
---

## Today

* Log reviews of "daily seeding"
* The Game of Life

## A-life

> New media art self-consciously reworks technology into culture, and rereads technology as culture. What's more, it does so in a concrete, applied way; it manipulates the technology itself, with a nonindustrial latitude that admits misapplication and adaptation, rewiring and hacking, pseudofunctionality and accident. *p.5, Metacreation*

> A-life begins with a notion of life that is wholly materialistic, involving no soul, vital force, or essence. In the words of the convenor of the first artificial life workshop, Christopher Langton, 'Living organisms are nothing more that complex biochemical machines.' Langton contends that rather than being any special substance or force, life is 'a property of the organization of matter.' Further, this organization is not simply a complex structure  but a dynamic structure, a system active in real time: for a-life, life is most importantly manifest in behavior. *p.7, Metacreation*

### Tenets of this approach:

  * no central organizer/intelligence
  * bottom-up structure
  * emergence produces lifelike systems
  * as opposed to the study of AI, A-life does not focus on intelligence but on behaviors and is not top-down, procedural

### Systems:

* genetic algorithms
  - separate beings (genotypes) with behaviors (phenotypes)
* agent-based systems
  - models individuals in an artifical world
* cellular automata
  - an array of individual cells computed with a set of simple rules governing a cell's future state, as affected by the current state of its neighbor cells

> We are no longer creating a work, we are creating creation...We are able to bring forth...results...which go beyond the intentions of their originators, and this in infinite number. -- Nicholas Schöffer *p.16, Metacreation*


### Inventing the Game of Life

<iframe width="560" height="315" src="https://www.youtube.com/embed/CgOcEZinQ2I?si=ehwiIGNFEr20iLyP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>  
Stephen Hawkings The Meaning of Life (John Conway's Game of Life segment)

<iframe width="560" height="315" src="https://www.youtube.com/embed/R9Plq-D1gEk?si=CWqqyvlNInP593eb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
Inventing Game of Life (John Conway) - Numberphile

## Cellular Automata in p5.js

<iframe src="https://editor.p5js.org/2sman/full/JWOk0UdFI"></iframe>

*from [p5.js examples - Game of Life](https://p5js.org/examples/math-and-physics-game-of-life/)*

### Cellular Automata in Minecraft

<iframe width="560" height="315" src="https://www.youtube.com/embed/wNypW-aSCmE?si=5EApUlR0_HmKfjG3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Multiple Neighborhood Cellular Automata

<iframe width="560" height="315" src="https://www.youtube.com/embed/5zY7AemnJpM?si=yish1mSzC8M_JLpS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/mha8eq2NLo8?si=c3uddAU7rUPE-H0c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>  

[More explorations with Multiple Neighborhoods Cellular Automata](https://softologyblog.wordpress.com/2018/03/31/more-explorations-with-multiple-neighborhood-cellular-automata/) by softology

### Procedural Level Design in Brogue and Beyond

<iframe width="560" height="315" src="https://www.youtube.com/embed/Uo9-IcHhq_w?si=GVeWUN_w7VTOJu6f" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Resources

* [cellular automata](https://tann.fun/article/cellular-automata) post by Tann
* [A New Kind of Science](https://www.wolframscience.com/nks/) book (online) by Stephen Wolfram
* [blog post](https://softologyblog.wordpress.com/2020/03/17/a-new-kind-of-science/) about it by Softology

## Forces

Goal: Have a number of objects move independently and respond to environmental forces.

A force is a vector that causes an object with mass to accelerate.

### Newton's 3 Laws of Motion

1. An object at rest remains at rest or an object in motion stays in motion at a constant velocity (speed and direction), unless acted upon by a force.
2. Force equals mass times acceleration.
3. For every action there is an equal and opposite reaction. Forces occur in pairs, in equal strength, in opposite directions.

**Mass** - measure of matter in an object, (in kilograms)  
**Weight** - the force of gravity on an object (in newtons)  
**density** - mass per unit (such as grams per centimeter)  

In our sketches, **the acceleration of an object is its force**.

Pseudocode - concept

```javascript
//NOTE: this is PSEUDOCODE to understand a concept!

class Mover {
  constructor(){
    vector location;
    vector velocity;
    vector acceleration;
  }
}
```

```
//PSEUDOCODE
// example applying methods

mover.applyForce(wind);
mover.applyForce(gravity);

....

//example method code inside a mover class

applyForce(vector force) {
  acceleration = force;
}
```

Note: the force really needs to reflect the total of all of the forces acting together: wind, gravity, and anything else. This could change from moment to moment, such as changing wind, so we need to recalculate every draw loop. We can do this by multiplying the acceleration by 0 at the end of a loop.

```javascript
function update() {
    velocity.add(acceleration);
    location.add(velocity);
    acceleration.mult(0);
 }
```

Now, let's work in actual Javascript/p5.js.
Let's create a mover, and apply a force to it.

```javascript
//modified from Daniel Shiffman's The Nature of Code

let m;

function setup() {
  createCanvas(640, 360);
  m = new Mover();
}

function draw() {
  background(50);

  //change its x value to move to the right
  let wind = createVector(0.01, 0); 
  m.applyForce(wind);

  m.update(); //change position
  m.display(); //draw to screen
  m.checkEdges(); //did we run off screen?
}
```


Now that we have the basic code mocked out, we need to build the actual Mover class.

```javascript
class Mover {
  constructor() {
    this.mass = 1;
    this.position = createVector(30, 30);
    this.velocity = createVector(0, 0); //starts at 0 until applied
    this.acceleration = createVector(0, 0); //starts at 0 until applied
  }

  applyForce(force) {
    var f = p5.Vector.div(force, this.mass); [derived](//derived) from Newton's Second Law
    this.acceleration.add(f); //add all the forces together (wind, gravity, etc)
  }

  update() {
    this.velocity.add(this.acceleration);  //acceleration is added to velocity
    this.position.add(this.velocity);  //velocity is added to position to get the next position
    this.acceleration.mult(0); //we reset the force to 0 at end
  }

  display() {
    stroke(0);
    strokeWeight(2);
    fill(255, 127);
    ellipse(this.position.x, this.position.y, 48, 48);
  }

  checkEdges() {
    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -1;
    } else if (this.position.x < 0) {
      this.velocity.x *= -1;
      this.position.x = 0;
    }
    if (this.position.y > height) {
      this.velocity.y *= -1;
      this.position.y = height;
    }
  }

}
```


Our full [code example](https://editor.p5js.org/2sman/sketches/SJ3EZE-9Q).

At this point, we have a single mover.
We can create an array of movers, each with their own starting position, and forces acting on them.

```javascript
//modified from Dan Shiffman Nature of Code
let movers = [];

function setup() {
  createCanvas(640, 360);
  for (let i = 0; i < 20; i++) { //initializing an array of 20 movers
    movers[i] = new Mover(random(0.1, 5), 0, 0);
  }
}

function draw() {
  background(255);

  for (let i = 0; i < movers.length; i++) { //this runs in a loop, so that it affects all movers individually
    let wind = createVector(0.01, 0);
    let gravity = createVector(0, 0.1);
    movers[i].applyForce(wind);
    movers[i].applyForce(gravity);
    movers[i].update();
    movers[i].display();
    movers[i].checkEdges();
  }
}
```


Notice the smaller movers are faster. Acceleration is force divided by mass, so larger masses have smaller accelerations.



An example with mousePressed to create a wind force on 2 movers.

```javascript
// The Nature of Code
let moverA;
let moverB;

function setup() {
  createCanvas(640, 360);
  // A large Mover on the left side of the window
  moverA = new Mover(200, 30, 10);
  // A smaller Mover on the right side of the window
  moverB = new Mover(440, 30, 2);
  createP('Click mouse to apply wind force.');
}

function draw() {
  background(51);

  let gravity = createVector(0, 0.1);

  let gravityA = p5.Vector.mult(gravity, moverA.mass);
  moverA.applyForce(gravityA);

  let gravityB = p5.Vector.mult(gravity, moverB.mass);
  moverB.applyForce(gravityB);

  if (mouseIsPressed) {
    let wind = createVector(0.1, 0);
    moverA.applyForce(wind);
    moverB.applyForce(wind);
  }

  moverA.update();
  moverA.display();
  moverA.checkEdges();

  moverB.update();
  moverB.display();
  moverB.checkEdges();
}
```

[code example](https://editor.p5js.org/2sman/sketches/hEKrAw8rQ)

[array of movers with forces](https://editor.p5js.org/2sman/sketches/g9ewFlXYR) - code example


## Ecosystem Project

* Read section 2 from [The Nature of Code](https://natureofcode.com/forces/) focusing on Air/Fluid Resistance
* Can you add mud? water? goo? that will slow down and affect your creature?
* Read section 2.9 on Attraction. This will let us make organisms that move around and follow things, run away from them (or eat them!). Can you add cheese that attracts your mouse? or pheromones that attract a critter? or honey that attracts a bear?
* See examples 2.5 and 2.6 [here](https://github.com/nature-of-code/noc-examples-p5.js/tree/master/chp02_forces) for starter p5.js code adapted from The Nature of Code
* optional: Watch Dan Shiffman's [tutorials](https://www.youtube.com/watch?v=II1A3bBo6gM&list=PLRqwX-V7Uu6ZRrqLcQ5BkBKmBLiGD8n4O) on forces if you'd like a review or alternate instruction model
* Your project should consist of at least one Class. Your environment should have forces. This could be gravity, wind. Add an attraction force. Make sure to replace your primitive shapes with images at this point. You should have a metaphor or situation in mind for what you are creating, not just "these circles want to eat these other circles" but a specific system you are trying to build.

