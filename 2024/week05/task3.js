let images = new Array(6);
let imageX = new Array(6);
let imageY = new Array(6);
let imageSpX = new Array(6);
let imageSpY = new Array(6);
let imageSize = 200;

function preload(){
    images[0] = loadImage('images/1.png');
    images[1] = loadImage('images/2.jpeg');
    images[2] = loadImage('images/3.png');
    images[3] = loadImage('images/4.jpg');
    images[4] = loadImage('images/5.gif');
    images[5] = loadImage('images/0.png');
}


function setup() {
    createCanvas(windowWidth*0.75,windowHeight);
    imageMode(CENTER);
          
    //assign positions and speeds directions
        for (var i = 0; i < images.length-1; i++) {
            imageX[i] = random(imageSize,width-imageSize);
            imageY[i] = random(imageSize,height-imageSize);
            imageSpX[i] = random(-10, 10);
            imageSpY[i] = random(-10, 10);
        }
    
    }


function draw() {
    background(50,50,50);

    for (var i = 0; i < images.length-1; i++){
        image(images[i],imageX[i],imageY[i],imageSize,imageSize);
        if(mouseIsPressed){
            if(dist(mouseX,mouseY,imageX[i],imageY[i])<(imageSize/2)){
                background(255,255,255)
                imageSpX[i] = 0;
                imageSpY[i] = 0;
                images[i] = images[5];
            }
        }
    }

    for (var i = 0; i < images.length-1; i++) {
      imageX[i] += imageSpX[i];
      imageY[i] += imageSpY[i];
      
      if (imageX[i] > width - imageSize / 2 || imageX[i] < imageSize / 2) {
        imageSpX[i] = -imageSpX[i];
      }
      
      if (imageY[i] > height - imageSize / 2 || imageY[i] < imageSize / 2) {
        imageSpY[i] = -imageSpY[i];
      }
  
      
    }
}