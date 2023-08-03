function setup() {
  // put setup code here
    createCanvas (500, 500);
}

function draw() {
    //base
    fill(51,153,255);
    rect(250, 100, 150, 150);
  
    //door
    fill(255,0,0);
    rect(260, 140, 65, 110);

    line(10,80,25,300);
    
    //roof
    fill(35,150,130);
    triangle(200,100,325,10,450,100);

    //doorknob
    fill(255,255,0);  
    ellipse(310, 200, 10, 10);
    

    //text box
    fill(254, 254, 254);
    rect(200, 250, 250, 50, 20);

    //x value
    textSize(20);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    fill(0,0,0);
    text(mouseX,300, 275);

    //y value
    let placeholderY = ( 'y - ' + mouseY );
    textSize(20);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    fill(0,0,0);
    text(mouseY,350, 275);
}