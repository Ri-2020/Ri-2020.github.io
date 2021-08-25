let ground;
let boxes = [];
let bird;
let world, engine;
let mConstraint;
let Bodies = Matter.Bodies;
let World = Matter.World;
let Engine = Matter.Engine;
let Mouse = Matter.Mouse;
let MouseConstraint = Matter.MouseConstraint;
let slingShot;
let button;
let flag = 0
// let nxtAction = document.querySelector(".updateAction");



let dotImg, boxImg, bgImg, grdImg;

function preload() {
  dotImg = loadImage('Images/dot.png');
  boxImg = loadImage('Images/equals.png')
  bgImg = loadImage('Images/skyBackground.png')
  grdImg = loadImage('Images/ground.png')

}


function setup() {
  const canvas = createCanvas(700, 400);
  engine = Engine.create();
  world = engine.world;


  ground = new Ground(width / 2, height - 20, width + 5, 40);
  for (var i = 0; i < 3; i++) {
    boxes[i] = new Box(550, 300 - i * 75, 100, 100);
  }
  bird = new Bird(150, 300, 25);

  slingShot = new SlingShot(150, 250, bird.body);

  const cmouse = Mouse.create(canvas.elt)
  cmouse.pixelRatio = pixelDensity()
  const options = {
    mouse: cmouse
  }
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
  document.querySelector('.hide').style.display = "none";
}


function birdRefersh(){
  World.remove(world, bird.body);
  bird = new Bird(150, 300, 25);
  slingShot = new SlingShot(150, 250, bird.body);
}


function keyPressed() {

    if (key == " ") {
      World.remove(world, bird.body);
      bird = new Bird(150, 300, 25);
      slingShot = new SlingShot(150, 250, bird.body);
      // nxtAction.innerText = "Click & Drag the Ball";
    }
    else {
      return false;
    }
}

let inX , inY;

function mousePressed(){
  inX = mouseX;
  inY = mouseY;
}

function mouseReleased() {
  if (inX > 0 && inY > 0 && inX < width && inY < height) {
  setTimeout(() => {
    slingShot.fly();
  }, 20);
  // nxtAction.innerText = "Press 'Space' Button";
}
}

function draw() {
  background(bgImg);
  Engine.update(engine);
  ground.show();
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].show();
    if (boxes[i].body.position.x > 750) {
      World.remove(world, boxes[i]);
      boxes.splice(i, 1);
      i = i - 1;
    }
  }
  var update = document.querySelector(".update");
  update.innerText = '';
  for(var i =0 ; i<boxes.length; i++){
    update.innerHTML += '<i class="fa fa-heart"> </i>'
  }


  if (boxes.length == 0) {
    var won = document.querySelector(".title");
    won.innerText = "You Won!!"

    setTimeout(() => {
      document.querySelector('.hide').style.display = "flex";
    }, 2000);

    setTimeout(() => {

      won.innerText = "Reloding Game"
    }, 3000);
    setTimeout(() => {
      won.innerText = "Clear Anger"
      setup();
    }, 3000);
  }


  bird.show();
  slingShot.show()
}
