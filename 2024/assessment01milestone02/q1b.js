function setup() {
    if(windowWidth < windowHeight){
        pageWidth = windowHeight * 0.6;
        pageHeight = windowHeight * 0.6;
        const pageOrientation = 1;
        console.log('Orientation is Portrait');
        console.log("pageWidth is " + pageWidth + " & " + pageHeight + " is pageHeight");
    } else {
        pageWidth = windowWidth * 0.7;
        pageHeight = windowWidth * 0.5;
        const pageOrientation = 0;
        console.log('Orientation is Landscape');
        console.log("pageWidth is " + pageWidth + " & " + pageHeight + " is pageHeight");
    } 
    createCanvas(pageWidth,pageHeight);
    background(10,10,10);
    rectMode(CENTER);
    noLoop();
    
    //bg
    fill(50,50,50);
    stroke(255,0,255);
    strokeWeight(5);
    rect(pageWidth/2, pageHeight/2,
        pageWidth * 0.95,pageHeight * 0.95,25); 
}
var pageWidth;
var pageHeight;


///////////////////////////////////////////////////////////////////////////////////////

function draw() {
    //select number of curved lines by making number range higher or lower
    const numNoodles = round(random(50,2000));
    console.log('number of noodles is ' + numNoodles);

    //add noodle positions to arrays
    let noodlesX1 = new Array(numNoodles);
    let noodlesY1 = new Array(numNoodles);
    let noodlesX2 = new Array(numNoodles);
    let noodlesY2 = new Array(numNoodles);
    let noodlesX3 = new Array(numNoodles);
    let noodlesY3 = new Array(numNoodles);
    let noodlesX4 = new Array(numNoodles);
    let noodlesY4 = new Array(numNoodles);

    for(let i = 0; i < numNoodles ; i++){
        console.log('it works');

        noodlesX1[i] = random(pageWidth*0.075,pageWidth*0.92);
        noodlesY1[i] = random(pageHeight*0.075,pageHeight*0.92);

        noodlesX2[i] = random(pageWidth*0.075,pageWidth*0.92);
        noodlesY2[i] = random(pageHeight*0.075,pageHeight*0.92);
        
        noodlesX3[i] = random(pageWidth*0.075,pageWidth*0.92);
        noodlesY3[i] = random(pageHeight*0.075,pageHeight*0.92);

        noodlesX4[i] = random(pageWidth*0.075,pageWidth*0.92);
        noodlesY4[i] = random(pageHeight*0.075,pageHeight*0.92);


        noFill();
        strokeWeight(random(5,20));
        stroke(random(0,255),random(0,255),random(0,255));
        beginShape();
            curveVertex(noodlesX1[i],noodlesY1[i]);
            curveVertex(noodlesX2[i],noodlesY2[i]);
            curveVertex(noodlesX3[i],noodlesY3[i]);
            curveVertex(noodlesX4[i],noodlesY4[i]);
        endShape();
}

}