---
title: Week 11 - Particle Systems and Squirrel Eat Squirrel
---

today:

- little performances
  - when should we perform?
- coding challenge: squirrel eat squirrel
- particle systems

### Coding Challenge: Squirrel Eat Squirrel

![squirrel eat squirrel](squirrel.webp)

Squirrel Eat Squirrel is a game by programmer Al Sweigart.

> Squirrel Eat Squirrel is loosely based on the game *Katamari Damacy*. The player controls a small squirrel that must hop around the screen eating smaller squirrels and avoiding larger squirrels. Each time the player’s squirrel eats a squirrel that is smaller than it, it grows larger. If the player’s squirrel gets hit by a larger squirrel larger than it, it loses a life point. The player wins when the squirrel becomes a monstrously large squirrel called the Omega Squirrel. The player loses if their squirrel gets hit three times.

<iframe width="560" height="315" src="https://www.youtube.com/embed/xB1sLRfcWj4?si=tHU3SFdmBmQBxP86" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Images: some [squirrels](https://opengameart.org/content/squirrels) from [Open Game Art](https://opengameart.org/)

## Particle systems

*Credit: This section contains code from Chapter 4 in The Nature of Code, Daniel Shiffman*

First we set up a system of particles

```javascript
//from The Nature Of Code, Daniel Shiffman
let system;

function setup() {
  createCanvas(640, 360);
  system = new ParticleSystem();
}

function draw() {
  background(255);
  system.run();
}
```

Now we need to set up the class for the particleSystem. First we need a class for an individual particle. We can re-use our Mover class code from earlier in the semester.

```javascript
//from The Nature of Code, Daniel Shiffman
class Particle {
  // A Particle object is just another name for a mover. It has position, velocity, and acceleration.
  constructor(x, y) {
    this.position = createVector(x, y);
    this.acceleration = createVector();
    this.velocity = createVector();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show() {
    stroke(0);
    fill(175);
    circle(this.position.x, this.position.y, 8);
  }
}
```

Next we add the single variable lifespan to our class.

```
//from The Nature of Code, by Daniel Shiffman
class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.acceleration = createVector();
    this.velocity = createVector();
    // A new variable to keep track of how long the particle has been “alive.” It starts at 255 and counts down to 0.
    this.lifespan = 255;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    // Life span decreases.
    this.lifespan -= 2.0;
  }

  show() {
    // Since the life ranges from 255 to 0, it can also be used for alpha.
    stroke(0, this.lifespan);
    fill(175, this.lifespan);
    circle(this.position.x, this.position.y, 8);
  }
}
```

Next we add in a way to test if the particle is alive or dead. We do this through testing its lifespan.

```javascript
//from The Nature of Code, Daniel Shiffman
  isDead() {
    // Is the particle still alive?
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
```

a simpler way of writing this:

```javascript
//from The Nature of Code, Daniel Shiffman
    isDead() {
      // Is the particle still alive?
      return (this.lifespan < 0.0);
    }
```

### A single particle

[link to code](https://editor.p5js.org/2sman/sketches/H__EGmona)

```javascript
//from The Nature of Code, Daniel Shiffman
let particle;

function setup() {
  createCanvas(640, 360);
  particle = new Particle(width / 2, 20);
}

function draw() {
  background(255);
  // Operate the single particle.
  particle.update();
  particle.show();
  // Apply a gravity force.
  let gravity = createVector(0, 0.1);
  particle.applyForce(gravity);
  // Check the particle’s state and make a new particle.
  if (particle.isDead()) {
    particle = new Particle(width / 2, 20);
    console.log("Particle dead!");
  }
}

class Particle {
  constructor(x,y) {
    this.position =  createVector(x, y);
    //{!1} For demonstration purposes, the particle has a random velocity.
    this.velocity = createVector(random(-1, 1), random(-2, 0));
    this.acceleration = createVector(0, 0);
    this.lifespan = 255.0;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2.0;
    this.acceleration.mult(0);
  }

  show() {
    stroke(0, this.lifespan);
    fill(0, this.lifespan);
    circle(this.position.x, this.position.y, 8);
  }

  // Keep the same physics model as in previous chapters.
  applyForce(force) {
    this.acceleration.add(force);
  }

  // Is the particle alive or dead?
  isDead() {
    return (this.lifespan < 0.0);
  }
}
```

Technically, when the particle "dies" it gets overwritten.

Next, we'll build an array of particles. In our draw, we need to loop through our array and remove any particles that are dead. We can't do this in a regular forward for-loop because we'll get strange errors while iterating through an array while removing elements. Instead, we loop through backwards.

```javascript
//from The Nature of Code, Daniel Shiffman
  //{!1} Loop through the list backward.
  for (let i = particles.length - 1; i >= 0; i--) {
    let particle = particles[i];
    particle.run();
    if (particle.isDead()) {
      particles.splice(i, 1);
    }
  }
```

[link to code](https://editor.p5js.org/2sman/sketches/mwHcivj4y)

```javascript
//modified from The Nature of Code, Daniel Shiffman
let particles = [];

function setup() {
  createCanvas(640, 240);
}

function draw() {
  background(255);
  particles.push(new Particle(width / 2, 20));
  //{!1} Loop through the array backward for deletion.
  for (let i = particles.length - 1; i >= 0; i--) {
    let particle = particles[i];
   // particle.run();
      particle.update();
      particle.show();
      let gravity = createVector(0, 0.1);
  particle.applyForce(gravity);
    
    if (particle.isDead()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x,y) {
    this.position =  createVector(x, y);
    //{!1} For demonstration purposes, the particle has a random velocity.
    this.velocity = createVector(random(-1, 1), random(-2, 0));
    this.acceleration = createVector(0, 0);
    this.lifespan = 255.0;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2.0;
    this.acceleration.mult(0);
  }

  show() {
    stroke(0, this.lifespan);
    fill(0, this.lifespan);
    circle(this.position.x, this.position.y, 8);
  }

  // Keep the same physics model as in previous chapters.
  applyForce(force) {
    this.acceleration.add(force);
  }

  // Is the particle alive or dead?
  isDead() {
    return (this.lifespan < 0.0);
  }
}
```

### Snowflakes

```javascript
//from p5.js documentation https://p5js.org/examples/classes-and-objects-snowflakes/
// Define array to hold snowflake objects
let snowflakes = [];

function setup() {
  createCanvas(400, 600);

  angleMode(DEGREES);

  // Create snowflake objects
  for (let i = 0; i < 300; i++) {
    // Add a new snowflake object to the array
    snowflakes.push(new Snowflake());
  }
}

function draw() {
  background(0);

  // Update and display each snowflake in the array
  let currentTime = frameCount / 60;

  for (let flake of snowflakes) {
    // Update each snowflake position and display
    flake.update(currentTime);
    flake.display();
  }
}

// Define the snowflake class

class Snowflake {
  constructor() {
    this.posX = 0;
    this.posY = random(-height, 0);
    this.initialAngle = random(0, 360);
    this.size = random(2, 5);
    this.radius = sqrt(random(pow(width / 2, 2)));
    this.color = color(random(200, 256), random(200, 256), random(200, 256));
  }

  update(time) {
    // Define angular speed (degrees / second)
    let angularSpeed = 35;

    // Calculate the current angle
    let angle = this.initialAngle + angularSpeed * time;

    // x position follows a sine wave
    this.posX = width / 2 + this.radius * sin(angle);

    // Different size snowflakes fall at different y speeds
    let ySpeed = 8 / this.size;
    this.posY += ySpeed;

    // When snowflake reaches the bottom, move it to the top
    if (this.posY > height) {
      this.posY = -50;
    }
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.posX, this.posY, this.size);
  }
}
```

## Homework

Squirrel Eat Squirrel

Basic Requirements:

- [ ] game works in fullscreen mode
- [ ] a player's squirrel. controlled by up, down, left, right arrow
- [ ] Procedurally generated 'squirrels' 
- [ ] classes for the Player and squirrels
- [ ] when an enemy squirrel collides with another squirrel the big one eats the smaller one and grows bigger
- [ ] if the player hits a larger squirrel, lose a life point and grow smaller
- [ ] if player hits a larger squirrel three times, game over

Advanced:

- [ ] add a class for grass and procedurally generate grass around the level. *Grass is like a squirrel that doesn't move!*
- [ ] balance the variables so the game gets to a compelling level of difficulty (the 'goldilocks' amount)
- [ ] better 'walking' pattern. hop? perlin noise?
- [ ] eating sounds
- [ ] procedurally generated flowers
- [ ] what else?

DOUBLE BONUS POINTS:

- [ ] self-playing version ('player' moves itself without player), possibly through Perlin noise 

### Reading and Write

Read [Chapter 4](https://natureofcode.com/particles/) from The Nature of Code (partially a review of things from today, and partly new material on inheritance and polymorphism)

Read [Writing Aliens OR Duchamp, Markov, Queneau: A Mostly Delightful Quilt](https://www.crummy.com/writing/speaking/2014-Foolscap/)  - 1 hour

Finish Squirrel Eat Squirrel
