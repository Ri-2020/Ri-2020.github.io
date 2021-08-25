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
let birdRemain;
let preB = 4, preA = 3;



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
  birdRemain = 4;
  preB = 4;
  preA = 3;


  //make bird hearts for the first time
  let updateRed = document.querySelector(".updateRed");
  updateRed.innerHTML = '';
  for (var i = 0; i < birdRemain; i++) {
    updateRed.innerHTML += '<i class="fa fa-heart"> </i>'
  }

  
  // making ground
  ground = new Ground(width / 2, height - 20, width * 2, 40);
  ground.body.collisionFilter.group = 1;
  ground.body.collisionFilter.category = 2;
  ground.body.collisionFilter.mask = 2;
  for (var i = 0; i < 3; i++) {
    boxes[i] = new Box(550, 300 - i * 75, 100, 100);
  }
  bird = new Bird(150, 300, 25);

  
  //making anger hearts
  var update = document.querySelector(".update");
  update.innerText = '';
  for (var i = 0; i < boxes.length; i++) {
    update.innerHTML += '<i class="fa fa-heart"> </i>'
  }


  slingShot = new SlingShot(150, 250, bird.body);

  
  // mouse constraints
  const cmouse = Mouse.create(canvas.elt)
  cmouse.pixelRatio = pixelDensity()


  const options = {
    mouse: cmouse
  }
  mConstraint = MouseConstraint.create(engine, options);
  mConstraint.collisionFilter.group  = 1;
  mConstraint.collisionFilter.mask  = 1;
  mConstraint.collisionFilter.category  = 1;
  World.add(world, mConstraint);

  document.querySelector('.hide').style.display = "none";

  console.log(bird.body);
  console.log(mConstraint);
  console.log(boxes[0].body);
  // var won = document.querySelector(".title");
  // won.innerText = "Clear Anger";

}



//if button is used to refresh the smily ball
function birdRefersh() {
  if (slingShot.sling.bodyB == null && birdRemain > 0) {
    World.remove(world, bird.body);
    bird = new Bird(150, 300, 25);
    slingShot = new SlingShot(150, 250, bird.body);
    birdRemain = birdRemain - 1;
  }
}



//when player press space button to refresh the bird
function keyPressed() {

  if (key == " " && slingShot.sling.bodyB == null && birdRemain > 0) {
    World.remove(world, bird.body);
    bird = new Bird(150, 300, 25);
    slingShot = new SlingShot(150, 250, bird.body);
    birdRemain = birdRemain - 1;
  }
  else {
    return false;
  }
}



let inX, inY;
function mousePressed() {
  inX = mouseX;
  inY = mouseY;
}



function mouseReleased() {
  var a = mouseX;
  var b = mouseY;
  if (inX > 0 && inY > 0 && inX < width && inY < height && a>0 && b>0 && a<300 && b<height  ) {
    setTimeout(() => {
      slingShot.fly();
    }, 20);
  }
}



function draw() {
  background(bgImg);
  Engine.update(engine);
  ground.show();



  for (var i = 0; i < boxes.length; i++) {
    boxes[i].show();


    // when the box is outside the frame we need to remove it from the world 
    if (boxes[i].body.position.x > 750) {
      World.remove(world, boxes[i]);
      boxes.splice(i, 1);
      i = i - 1;
    }


  }


  // to update hearts of anger level
  if (boxes.length != preA) {
    preA = boxes.length
    var update = document.querySelector(".update");
    update.innerText = '';
    for (var i = 0; i < boxes.length; i++) {
      update.innerHTML += '<i class="fa fa-heart"> </i>'
    }
  }


  //to update hearts of the birds
  if (birdRemain != preB) {
    preB = birdRemain;
    let updateRed = document.querySelector(".updateRed");
    updateRed.innerHTML = '';
    for (var i = 0; i < birdRemain; i++) {
      updateRed.innerHTML += '<i class="fa fa-heart"> </i>'
    }
  }



  // when player loose or won the game
  if (boxes.length == 0 || birdRemain == 0) {

    var won = document.querySelector(".title");
    
    if (boxes.length != 0) { won.innerText = "You Loose!!" }
    else { won.innerText = "You Won!!" }

    World.remove(world, mConstraint);
    World.remove(world, bird.body)

    setTimeout(() => {
      document.querySelector('.hide').style.display = "flex";
    }, 2000);

    
    setTimeout(() => {
      won.innerText = "Clear Anger"
      setup();
    }, 3000);

  }

  



  bird.show();
  slingShot.show()
}
