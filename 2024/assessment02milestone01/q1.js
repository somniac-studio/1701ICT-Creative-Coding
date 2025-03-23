/*
1 - The program should read a track in from a file called ‘track.txt’. 
0 should indicate
grass, 
1 should indicate track and 
2 should indicate start/finish line. You should
find/draw appropriate images to use as tiles to represent these components, and it
is recommended that you load them in as sprites. Each ‘tile’ should have dimensions
controlled by variables, and be positioned according to the input file. If the input file
is 10x10 numbers, you should draw this many tiles. The track is static, so this could
be drawn in the setup phase, but you will need access to this data for detecting the
car leaving the track (3 marks) - DONE

2 - The program should draw a car as a sprite on the start finish line, facing one of the
adjacent road tiles. You could find a suitable image to use. The car size should be
controlled by a variable (but always smaller than the tile size) and be placed in the
middle of the road. (2 marks) - DONE

3 - The program should allow for 4 inputs – up/down and left/right on the keyboard. Up
and down should modify the velocity of the car (you should impose limits so it
cannot go too fast or backwards). Left and right should rotate the angle it is facing
and moving. This should be done in a smooth way so the car cannot execute instant
90 degree turns. (4 marks) - DONE

4 - If the car leaves the track and hits the grass, the game should reset to the start
position (simply move the car back to its initial position) (3 marks) - DONE
*/
var pageWidth;
var pageHeight;

var car;
var carImage;
let fileContent;
let tiles;
let spr;
let tileScale = 24;
let offset = 24;
var carScale;




var spriteWidth;
var spriteHeight;

var offsetX = spriteWidth;
var offsetY = spriteHeight;

let grass;
let cars;
let field;
let racetrack;

let track = [];
let images = [];

let isCarAlive = new Boolean(false)
let isTrackBuilt = new Boolean(false)

let failCount = 0;
var tileNum;

////////////////////////////////////////////////////////////////////////////////////////

function preload() {
  //load track
  fileContent = loadStrings('assets/donut.txt')
  //fileContent = loadStrings('assets/track.txt')

  //load image assets into array
  images[0] = loadImage('assets/grass.png');
  images[1] = loadImage('assets/roadVert.png');
  images[2] = loadImage('assets/start.png');
  images[3] = loadImage('assets/roadHori.png')
  images[4] = loadImage('assets/roadCornerTL.png')
  images[5] = loadImage('assets/roadCornerTR.png')
  images[6] = loadImage('assets/roadCornerBL.png')
  images[7] = loadImage('assets/roadCornerBR.png')

  carImage = loadImage("assets/car.png");
}

////////////////////////////////////////////////////////////////////////////////////////

function setup() {
    pageWidth = windowWidth * 0.50;
    pageHeight = windowWidth * 0.50;
    console.log("pageWidth is " + pageWidth + " & " + pageHeight + " is pageHeight");
  createCanvas(pageWidth,pageHeight);

  field = new Group();
  racetrack = new Group();
  cars = new Group();

}

////////////////////////////////////////////////////////////////////////////////////////

function draw() {
  background(0);
  
  buildTrack();

  spawnCar();


//controls
if (keyDown(LEFT_ARROW)){
  car.rotation -= 4;}
if (keyDown(RIGHT_ARROW)){
  car.rotation += 4;}
if (keyDown(UP_ARROW)){
  car.addSpeed(0.4, (car.rotation-90));
  }
if (keyDown(32)){
  car.friction = .3;
}
if (keyWentUp(32)){
  car.friction = .1;
}
  

if (car.overlap(field)) {
  //car.remove();
  isCarAlive=false;
  failCount++
}

  car.collide(cars)
  field.debug = mouseIsPressed;

  //draw the field
  drawSprites();
  
  //instructions
  fill(255);
  textSize(18);
  textAlign(CENTER);
  text("Controls: Arrow Keys to Drive + Spacebar to brake! Don't crash or you'll reset!", width / 2, 25);

  //failcount
  fill(25)
  rectMode(CENTER);
  rect(pageWidth/2, pageHeight*0.935, pageWidth/3, pageHeight/14, 25)

  fill(255)
  textSize(32);
  textAlign(CENTER);
  text("Fails x" + failCount, pageWidth/2, pageHeight*0.95)
  
}

////////////////////////////////////////////////////////////////////////////////////////

function buildTrack(){
  if(isTrackBuilt == false){
  track = new Array(fileContent.length);
  //let tileScale = 64;
  //let tileScale = pageWidth/tileNum;
  //let offset = 24;
  carScale = tileScale/2;
  for (let j = 0; j < track.length; j++) {
    let tiles = splitTokens(fileContent[j]);
    var tileNum = splitTokens(fileContent[j]);
    let tileScale = (pageWidth/tileNum.length);
    console.log(tileNum);
    images[0].resize(tileScale+1,tileScale+1);
    images[1].resize(tileScale+1,tileScale+1);
    images[2].resize(tileScale+1,tileScale+1);
    images[3].resize(tileScale+1,tileScale+1);
    images[4].resize(tileScale+1,tileScale+1);
    images[5].resize(tileScale+1,tileScale+1);
    images[6].resize(tileScale+1,tileScale+1);
    images[7].resize(tileScale+1,tileScale+1);
    let offset = 26;

      for (let k = 0; k < track.length; k++) {     
        if (tiles[k] == "0") {
            grass = createSprite(j * tileScale + offset, k * tileScale + offset, tileScale, tileScale);
            grass.addImage("normal", images[0])
            field.add(grass);
        }
        if (tiles[k] == "1") {
            roadVert = createSprite(j * tileScale + offset, k * tileScale + offset, tileScale, tileScale);
            roadVert.addImage("normal", images[1])
            racetrack.add(roadVert);
            
        }
        if (tiles[k] == "2") {
            roadStart = createSprite(j * tileScale + offset, k * tileScale + offset, tileScale, tileScale);
            roadStart.addImage("normal", images[2])
            racetrack.add(roadStart);
        }
        if (tiles[k] == "3") {
            roadHori = createSprite(j * tileScale + offset, k * tileScale + offset, tileScale, tileScale);
            roadHori.addImage("normal", images[3])
            racetrack.add(roadHori);
        }
        if (tiles[k] == "4") {
            roadCornerTL = createSprite(j * tileScale + offset, k * tileScale + offset, tileScale, tileScale);
            roadCornerTL.addImage("normal", images[4])
            racetrack.add(roadCornerTL);
        }
        if (tiles[k] == "5") {
            roadCornerTR = createSprite(j * tileScale + offset, k * tileScale + offset, tileScale, tileScale);
            roadCornerTR.addImage("normal", images[5])
            racetrack.add(roadCornerTR);
        }
        if (tiles[k] == "6") {
            roadCornerBL = createSprite(j * tileScale + offset, k * tileScale + offset, tileScale, tileScale);
            roadCornerBL.addImage("normal", images[6])
            racetrack.add(roadCornerBL);
        }
        if (tiles[k] == "7") {
            roadCornerBR = createSprite(j * tileScale + offset, k * tileScale + offset, tileScale, tileScale);
            roadCornerBR.addImage("normal", images[7])
            racetrack.add(roadCornerBR);
        }
      }
    }
    isTrackBuilt = true;
  }
}

function spawnCar(){
  if(isCarAlive == false){
  carSpawn = new Array(fileContent.length);
    for (let j = 0; j < carSpawn.length; j++) {
    let tiles = splitTokens(fileContent[j]);
    var tileNum = splitTokens(fileContent[j]);
    let tileScale = (pageWidth/tileNum.length);
      for (let k = 0; k < track.length; k++) {     
        if (tiles[k] == "2") {
          carScale = tileScale*0.5;
          console.log('local carScale is ' + carScale)
          let offsetX = tileScale*0.5;
          let offsetY = tileScale*0.5;
          car = createSprite(j * tileScale + offsetX, k * tileScale + offsetY, carScale, carScale);
          console.log("car has spawned")
          isCarAlive = true;
      }
    }
  }
}
  
   //setup car stuff
   car.maxSpeed = 15;
   car.friction = 0.09;
   car.setCollider("circle", 0, 0, carScale/3);
   console.log('global carScale is ' + carScale)
   car.addImage("normal", carImage);
   carImage.resize(carScale,carScale);
   car.debug = mouseIsPressed;
   console.log(isCarAlive);

}