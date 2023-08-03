let img;
function preload(){
    img = loadImage('images/test.jpg')
}


function setup() {
    createCanvas(windowWidth*0.75,windowHeight);
    background(200,200,200);
}

function draw() {
    image(img,0,0);
}