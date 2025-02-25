---
title: Week 5 - Random Robots / Motion with vectors
---

## Today

*Vectors and Autonomous objects*: drawing, driving, picking things up

* Log reviews of "daily seeding"
* vectors and motion
* vector math
* objects and pickups

## Vectors

> A vector can be thought of in different ways. In one view, a vector is like an arrow pointing in space. Vectors have both magnitude (length) and direction. This view is helpful for programming motion. *from p5.js [reference](https://p5js.org/reference/p5/createVector/)*

![vector](vector.svg)  

*cc by, by [Daniel Shiffman](https://p5.readthedocs.io/en/latest/tutorials/vector.html), The Nature of Code*

> p5.Vector objects are often used to program motion because they simplify the math. For example, a moving ball has a position and a velocity. Position describes where the ball is in space. The ball's position vector extends from the origin to the ball's center. Velocity describes the ball's speed and the direction it's moving. If the ball is moving straight up, its velocity vector points straight up. Adding the ball's velocity vector to its position vector moves it, as in pos.add(vel). Vector math relies on methods inside the p5.Vector class. *from p5.js [reference](https://p5js.org/reference/p5/createVector/)*

A velocity is a vector, the difference between two points in space. A location (x,y) can also be a vector because it is the path from the origin to get to that coordinate in space.

p5.Vector() lets us store two values together.

The algorithm for motion is: 

```
motion = motion + velocity
```

This adds the current speed to the location.


Without vectors, to make a bouncing ball we did:

```
x = x + xspeed
y = y + yspeed
```

Now, instead, we can use the *add()* method.


```
//from createVector
let pos;
let vel;

function setup() {
  createCanvas(100, 100);

  // Create p5.Vector objects.
  pos = createVector(50, 100);
  vel = createVector(0, -1);

  describe('A black dot moves from bottom to top on a gray square. The dot reappears at the bottom when it reaches the top.');
}

function draw() {
  background(200);

  // Add velocity to position.
  pos.add(vel);

  // If the dot reaches the top of the canvas,
  // restart from the bottom.
  if (pos.y < 0) {
    pos.y = 100;
  }

  // Draw the dot.
  strokeWeight(5);
  point(pos);
}
```

## CODE: A robot that picks things up

[code](https://editor.p5js.org/2sman/sketches/vIGLx3SNo)

<iframe src="https://editor.p5js.org/2sman/full/vIGLx3SNo"></iframe>

*Arrow keys to move*

```javascript
let bot;
let something
function setup() {
  createCanvas(400, 400);
  bot = new Robot()
  something = new Thing()
}

function draw() {
  background(220);
  bot.display()
  bot.move()
  bot.collision()
  something.display()
  something.move()
}

class Robot{
  constructor(){
    this.x = random(width)
    this.y=random(height)
  }
  display(){
    fill('blue')
    circle(this.x,this.y,20)
  }
  collision(){
    if (dist(this.x,this.y,something.x,something.y)<12){
      something.held = true;
      
    }
  }
    
    move(){
      if (keyIsDown("40")){
        this.y++
      }
       if (keyIsDown("38")){
        this.y--
      }
       if (keyIsDown("37")){
        this.x--
      }
       if (keyIsDown("39")){
        this.x++
      }
    }
  }
  

class Thing{
  constructor(){
    this.x = random(width)
    this.y=random(height)
    this.held = false;
  }
  display(){
    fill('red')
    circle(this.x,this.y,5)
  }
  move(){
    if (this.held == true){
      this.x=bot.x
      this.y=bot.y
       
    } 
  }
}
```

## Robot grabs ball

<iframe src="https://editor.p5js.org/2sman/full/Yvy60YNSR"></iframe>

[code](https://editor.p5js.org/2sman/sketches/Yvy60YNSR)

```javascript
let robot;
let box;

function setup() {
  createCanvas(400, 400);
  noStroke();
  rectMode(CENTER);

  robot = new Ball();

  box = new Box();
}

function draw() {
  background(220);

  box.display();
  box.moving();

  robot.display();
  robot.update();
}

class Ball {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = new createVector(random(-5, 5), random(-5, 5));
    this.size = 20;
    this.c = color(170);
  }

  update() {
    //add the current speed to the position
    this.position.add(this.velocity);

    //check if offscreen
    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.position.y < 0 || this.position.y > height) {
      this.velocity.y = this.velocity.y * -1;
    }
  }

  display() {
      fill(this.c);
      ellipse(this.position.x, this.position.y, this.size)
  }
}

class Box {
  constructor() {
    this.position = createVector(width/2,height/2);
    this.w = 20;
    this.h = 25;
    this.delivered = false;
  }

  display() {
    fill(0);
    rect(this.position.x,this.position.y, this.w, this.h);
  }
  
  moving() {
    
    if(this.position.x > 350){
      this.delivered = true;
      print("delivered");
    }
    
    if (this.delivered == false){
      if (this.position.dist(robot.position) < 50 ){
        print("moving");
        this.position = robot.position.copy();
      }
    }
  }
}
```

## Workshop: Smart robot Alfie

![Alphie the robot](alphie.jpg)  

Alfie is a little robot who needs to pick up all the objects in the room and return them.

Create 5 random round obstructions in the center line of the sketch.

Create 5 boxes on the left side of the canvas.

Alfie the robot starts on the right side. He should pick up the boxes one at a time and return them back to the right side of the screen for safekeeping.

OPTIONAL: Moving obstacles.
