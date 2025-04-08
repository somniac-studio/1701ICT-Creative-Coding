/*
For this question, draw a bullseye target that follows the user’s mouse around the screen (hint:
mouseX, mouseY). 
The target should have at least 3 circles inside of each other

In addition, draw crosshairs (horizontal and vertical lines) that move together with the target as
*/

// By  Keifer G

//setup canvas with set framerate for consistency actross devices and hide cursor, so bullseye is easily seen
function setup() {
    createCanvas(1000, 1000);

    angleMode(DEGREES);
    noCursor();
    frameRate(60);
    colorMode(RGB, 255);

    describe(
      'Bullseye and Crosshair lines that follow the cursor'
    );
    
  }

function draw() {
    //Variables for each size of bullseye ring
    let ring1 = 15;
    let ring2 = 25;
    let ring3 = 35;
    let ring4 = 45;
    let ring5 = 60;
    //set the size and thickness of the lines behind bullseye, aka the crosshair
    let crosshairSize = width*2;
    let crosshairThickness = 2;
    let crosshairColour = (100,100,100);
    
    let BullseyeWhite = (255,255,255);

    //begin actual functions
    background(12);

        // Draw Crosshair
        stroke(crosshairColour);
        strokeWeight(crosshairThickness);
        //Horizontal Line
        line(mouseX - crosshairSize / 2, mouseY , mouseX + crosshairSize / 2, mouseY)
        //Vertical Line
        line(mouseX, mouseY - crosshairSize / 2 , mouseX , mouseY + crosshairSize / 2)


        //Draw Bullseye
        noStroke();
        fill(255,0,0);
        circle(mouseX,mouseY,ring5);
        fill(BullseyeWhite);
        circle(mouseX,mouseY,ring4);
        fill(255,0,0);
        circle(mouseX,mouseY,ring3);
        fill(BullseyeWhite);
        circle(mouseX,mouseY,ring2);
        fill(255,0,0);
        circle(mouseX,mouseY,ring1);



        
  }