//Find four images (e.g. four bugs, or four cars)
// Create an array for the images, e.g. let images = new Array(4);
// In the setup() function assign random locations and speeds to the images


let images = new Array(5);
let imageX = new Array(5);
let imageY = new Array(5);
let imageSpX = new Array(5);
let imageSpY = new Array(5);
let imageSize = 200;

function preload(){
    images[0] = loadImage('images/1.png');
    images[1] = loadImage('images/2.jpeg');
    images[2] = loadImage('images/3.png');
    images[3] = loadImage('images/4.jpg');
    images[4] = loadImage('images/5.gif');
}


function setup() {
    createCanvas(windowWidth*0.75,windowHeight);
    imageMode(CENTER);
          

    //assign positions and speeds directions
        for (var i = 0; i < images.length; i++) {
            imageX[i] = random(imageSize,width-imageSize);
            imageY[i] = random(imageSize,height-imageSize);
            imageSpX[i] = random(-10, 10);
            imageSpY[i] = random(-10, 10);
        }
    
        //log that garbage
            console.log("X0 is " + imageX[0] + " & Y0 is " + imageY[0]);
            console.log("X1 is " + imageX[1] + " & Y1 is " + imageY[1]);
            console.log("X2 is " + imageX[2] + " & Y2 is " + imageY[2]);
            console.log("X3 is " + imageX[3] + " & Y3 is " + imageY[3]);
            console.log("X0 Speed is " + imageSpX[0] + " & Y0 is " + imageSpY[0]);
            console.log("X1 Speed is " + imageSpX[1] + " & Y1 is " + imageSpY[1]);
            console.log("X2 Speed is " + imageSpX[2] + " & Y2 is " + imageSpY[2]);
            console.log("X3 Speed is " + imageSpX[3] + " & Y3 is " + imageSpY[3]);

}

function draw() {
    background(50,50,50);

    for (var i = 0; i < images.length; i++){
        image(images[i],imageX[i],imageY[i],imageSize,imageSize);
    }

    for (var i = 0; i < images.length; i++) {
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