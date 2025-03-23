//define track and speed and yada yada yada
let centerX = 250 ;
let centerY = 250 ;

let trackW = 400;
let trackH = 250;

let angle = 0;
let angle2 = 0;

let distX = trackW / 2;
let distY = trackH / 2;

let speedA = 1;
let speedB = 0.2;


function setup() {
    createCanvas(500,500);
    ellipseMode(CENTER);
    angleMode(DEGREES);

}

function draw() {
    background(30, 115, 22);

    //track
    noFill();
    stroke(117, 115, 125);
    strokeWeight(50);
    ellipse(centerX,centerY,trackW,trackH);

    //stripes
    strokeWeight(1);
    stroke(190, 189, 98);
    ellipse(centerX,centerY,trackW+2,trackH+2);
    ellipse(centerX,centerY,trackW-2,trackH-2);

   
    //car 1
    noStroke();
    fill(239, 37, 28);
    circle(centerX + [distX - 15] * cos(angle),
            centerY + [distY - 15] * sin(angle),
            15);

    //car 2
    fill(0, 30, 243);
    circle(centerX + [distX + 15] * cos(angle2),
            centerY + [distY + 15] * sin(angle2),
            15);

    angle += speedA;
    angle2 += speedB;


    console.log(angle);
}