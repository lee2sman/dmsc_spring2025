let t;
function setup() {
  noCanvas()
  t=select('#turtle');
  x=random(windowWidth*2/3,windowWidth)
  y=0;
  t.style('rotate','180deg')
  t.position(x,y);
  frameRate(1);
}

function draw() {
  t.position(x,y);
  y+=random(1,3)
}
