let fr = 60;

function setup() {
    createCanvas(500,500);
    frameRate(fr);
    ellipseMode(CENTER);
    angleMode(DEGREES);
}

//defining position & size
let pos_X = 250 ;
let pos_Y = 250 ;
let scale = 1 ;

let angle = 0 ;
let distance = 62.5 * scale ;
let speed = 1 ;


let offset_X1 = pos_X * 0.75 * scale ;
let offset_X2 = pos_X * 1.25 * scale ;

let b1 = 250 * scale ;
let b2 = 125 * scale ;
let b3 = 40 * scale ;

let w1 = 250 * scale ;
let w2 = 125 * scale ;
let w3 = 40 * scale ;





function draw() {
    background(200, 200, 0);

//base colours
        //-black base - b1
    fill(0,0,0) ;
    noStroke() ;
    circle(pos_X, pos_Y,
            b1) ;

        //-white half - w1
    fill(255,255,255) ;
    arc(pos_X,pos_Y,
        w1,w1,
        0 + angle,180 + angle) ;


//-overlay circles
        //black - b2
    fill(0,0,0) ;
    circle(pos_X + distance * cos(angle), 
            pos_Y + distance * sin(angle),
            b2) ;

        //white - b2
    fill(255,255,255) ;
    circle(pos_X - distance * cos(angle), 
            pos_Y - distance * sin(angle),
            w2) ;

//-lil circles
        //black - b3
    fill(0,0,0) ;
    circle(pos_X - distance * cos(angle),
            pos_Y - distance * sin(angle),
            b3) ;

        //white - b3
    fill(255,255,255) ;
    circle(pos_X + distance * cos(angle),
            pos_Y + distance * sin(angle),
            w3) ;

        angle += speed;

}