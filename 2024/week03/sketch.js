function setup() {
  // put setup code here
    createCanvas (500, 500);
    background(244,244,244);
}

function draw() {

    if(mouseY>250){
      background(244,244,244);
      triangle(250,0,20,200,450,200);
    }
    else{
      background(244,244,244);
      triangle(250,500,20,300,450,300);
    }
    line(0,250,500,250);
}