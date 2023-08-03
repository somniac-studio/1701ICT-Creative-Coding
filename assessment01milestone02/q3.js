// SPACE ADVENTURE BANNER
var pageWidth;
var pageHeight;

//define number of stars bruh
const numStars = 800
let stars = [];

//for the secret function
let isOn = false;
let btnX, btnY;

//more for secret function :)
var xBall = Math.floor(Math.random() * 300) + 50;
var yBall = 50;
var xSpeed = (2, 7);
var ySpeed = (-7, -2);
var score = 0;
let secretgame;

function preload(){
    ship = loadImage('q3assets/ship.png');
    boost =  loadImage('q3assets/boost.png');
    logo =  loadImage('q3assets/logo.png');
}

function setup() {
    if(windowWidth < windowHeight){
        pageWidth = windowHeight * 0.70;
        pageHeight = windowHeight * 0.50;
        console.log("pageWidth is " + pageWidth + " & " + pageHeight + " is pageHeight");
    } else {
        pageWidth = windowWidth * 0.70;
        pageHeight = windowWidth * 0.50;
        console.log("pageWidth is " + pageWidth + " & " + pageHeight + " is pageHeight");
    } 
    createCanvas(pageWidth,pageHeight);
    secretgame = createGraphics(pageWidth*0.7,pageHeight*0.7);
    background(5,5,5);
    stroke(255);
    strokeWeight(2);
    rectMode(CENTER);
    imageMode(CENTER);
    noCursor();

    //create the stars array
    for(let i = 0; i < numStars; i ++) {
        stars.push(new Star(random(pageWidth), random(pageHeight)));
      }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function draw() {
  background(0, 50);
  
  //stuff for nefarious easter egg
  // Background
  secretgame.background(0,0,0);

  // Paddle
  secretgame.fill('#ffffff');
  secretgame.rect(mouseX, 375, 90, 15);

  //Functions
  move();
  display();
  bounce();
  resetBall();
  paddle();

  //Score
  secretgame.fill('#d9c3f7');
  secretgame.textSize(24);
  secretgame.text("Score: " + score, 10, 25);
  
    

  const acc = map(mouseY, 0, pageHeight, 0.005, 0.2);
  
  stars = stars.filter(
    star => 
    {
    star.draw();
    star.update(acc);
    return star.isActive();
    }
  );
  
  while(stars.length < numStars) {
    stars.push(new Star(random(width), random(height)));
  }


    //ship
    let shipScaleX = 128+(mouseY*0.4);
    let shipScaleY = 128+(mouseY*0.3);
    let boostScaleX = 128+(mouseY*0.6);
    let boostScaleY = 128+(mouseY*0.6);

    let shipX = pageWidth/2;
    let shipY = pageHeight/ 2;
    let shipEasing = 0.5;

    let targetX = mouseX;
    let shipDX = targetX - shipX;
    shipX += shipDX * shipEasing;
  
    let targetY = mouseY;
    let shipDY = targetY - shipY;
    shipY += shipDY * shipEasing;

    if(mouseY >= pageHeight*0.7)
    {
        boostScaleX = boostScaleX + random(-50,200);
        boostScaleY = boostScaleY + random(-50,100);
    }

    else if(mouseY >= pageHeight*0.5)
    {
        boostScaleX = boostScaleX + random(-50,75);
        boostScaleY = boostScaleY + random(-50,50);
    }

    else if(mouseY >= pageHeight*0.1)
    {
        boostScaleX = boostScaleX + random(-25,25);
        boostScaleY = boostScaleY + random(-25,25);
    }

    image(ship, shipX, shipY, shipScaleX, shipScaleY);
    image(boost, shipX, shipY, boostScaleX, boostScaleY);


  //Header
  fill('rgba(230,15,15, 0.25)');
  let headerWidth = pageWidth*1.5;
  let headerHeight = pageHeight*0.55;

  if(isOn){
    console.log("is on bebe");
    headerHeight = headerHeight*100;
    headerWidth = headerWidth + 5;
    fill(230,15,15);
  }
  else{
    console.log("is off");
    
  }

  ellipse(pageWidth/2,0,headerWidth, headerHeight);
   

    //1701 Text
  fill('rgba(255,255,255, 0.8)');
  textAlign(CENTER);
  textSize(32);
  text('1701ICT Creative Coding',pageWidth/2,pageHeight*0.23);

  //Griffith Logo with dark secrets
  image(logo,
  pageWidth/2,pageHeight*0.1,
  819 * (pageWidth * 0.0005),
  223 * (pageHeight * 0.0007))

  ellipse(mouseX,mouseY,15)
}

//////////////////////////////////////////////////CLASSES BELOW////////////////////////////////////////////////////////////

//controls all the nonsense of each star
class Star {
  constructor(x, y) 
  {
    this.pos = createVector(x, y);
    this.prevPos = createVector(x, y);
    
    this.vel = createVector(0, 0);
    
    this.ang = atan2(y - (pageHeight*0.35), x - (pageWidth/2));
  }
  
  isActive() {
    return onScreen(this.prevPos.x, this.prevPos.y);
  }
  
  update(acc) {
    this.vel.x += cos(this.ang) * acc;
    this.vel.y += sin(this.ang) * acc;
    
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
    
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
  
  draw() {
    const alpha = map(this.vel.mag(), 0, 3, 0, 255);
    stroke(255, alpha);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
  }
}

////////////////////////////////////////////FUNCTIONS & SUCH///////////////////////////////////////////////////////////////////

function onScreen(x, y) {
  return x >= 0 && x <= width && y >= 0 && y <= height;  
}


function mouseClicked(){
   let btnX = pageWidth*0.36;
   let btnY = pageHeight*0.15;
   let radius = pageHeight*0.2;
    if(dist(btnX,btnY,mouseX,mouseY)<radius)
        {
        if(isOn == true) isOn = false;
        else isOn = true;
        ellipse(btnX,btnY,radius);
        }
       
    }


// Ball Functions
function move() {
  xBall += xSpeed;
  yBall += ySpeed;
}

function bounce()
{
  if (xBall < 10 ||
    xBall > 400 - 10) {
    xSpeed *= -1;
  }
  if (yBall < 10 ||
    yBall > 400 - 10) {
    ySpeed *= -1;
  }
}


// Reset Ball
function resetBall() {
  if (yBall >= 400 ||
    yBall > 400 - 10) {
    ySpeed = 4;
 }

}

function display() {
  secretgame.fill('#d9c3f7');
  secretgame.ellipse(xBall, yBall, 20, 20);
}

// Bounce off Paddle
function paddle() {
  if ((xBall > mouseX &&
      xBall < mouseX + 90) &&
    (yBall + 10 >= 375)) {
    xSpeed *= -1;
    ySpeed *= -1;
    score++;

  }
}
