function setup() {
    createCanvas(500,100);
    background(101,105,251);
    noLoop();
}

function draw() {
    fill('rgba(104,202,153, 0.25)');
    rect(15,10,75,75,15);

    fill('rgba(104,202,153, 0.5)');
    rect(115,10,75,75,15);
    
    fill('rgba(104,202,153, 0.75)');
    rect(215,10,75,75,15);
    
    fill('rgba(104,202,153, 0.9)');
    rect(315,10,75,75,15);
    
    fill(104,202,153);
    rect(415,10,75,75,15);
}