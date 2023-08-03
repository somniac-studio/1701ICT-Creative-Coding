let fileContent;
let tiles;
let spr;
let tileScale = 64;
let offset = 50;

var pageWidth;
var pageHeight;

let images = [];

function preload() {
  fileContent = loadStrings('assets/track.txt');

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

function setup() {
  createCanvas(1000, 1000);

  track = new Array(fileContent.length);
  for (let j = 0; j < track.length; j++) {
    let tiles = splitTokens(fileContent[j]);

      for (let k = 0; k < track.length; k++) {     
        if (tiles[k] == "0") {
            grass = createSprite(j * tileScale + offset, k * tileScale + offset, tileScale, tileScale);
            grass.addImage("normal", images[0])
        }
        if (tiles[k] == "1") {
            roadVert = createSprite(j * tileScale + offset, k * tileScale + offset, tileScale, tileScale);
            roadVert.addImage("normal", images[1])
            setCollider("aabb"[, offsetX, offsetY,[, width, height]])
        }
        if (tiles[k] == "2") {
            roadStart = createSprite(j * tileScale + offset, k * tileScale + offset, tileScale, tileScale);
            roadStart.addImage("normal", images[2])
        }
        if (tiles[k] == "3") {
            roadHori = createSprite(j * tileScale + offset, k * tileScale + offset, tileScale, tileScale);
            roadHori.addImage("normal", images[3])
        }
        if (tiles[k] == "4") {
            roadCornerTL = createSprite(j * tileScale + offset, k * tileScale + offset, tileScale, tileScale);
            roadCornerTL.addImage("normal", images[4])
        }
        if (tiles[k] == "5") {
            roadCornerTR = createSprite(j * tileScale + offset, k * tileScale + offset, tileScale, tileScale);
            roadCornerTR.addImage("normal", images[5])
        }
        if (tiles[k] == "6") {
            roadCornerBL = createSprite(j * tileScale + offset, k * tileScale + offset, tileScale, tileScale);
            roadCornerBL.addImage("normal", images[6])
        }
        if (tiles[k] == "7") {
            roadCornerBR = createSprite(j * tileScale + offset, k * tileScale + offset, tileScale, tileScale);
            roadCornerBR.addImage("normal", images[7])
        }
      }
  }
}


function draw() {
  background(0);

  drawSprites();

}