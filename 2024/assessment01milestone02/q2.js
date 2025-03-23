//some cute declarations
var pageWidth;
var pageHeight;
var cols = 10;
var rows = 10;
var t = 0;
var particleArray = [];

function setup() {
    if(windowWidth < windowHeight){
        pageWidth = windowHeight * 0.6;
        pageHeight = windowHeight * 0.6;
        const pageOrientation = 1;
        console.log('Orientation is Portrait');
        console.log("pageWidth is " + pageWidth + " & " + pageHeight + " is pageHeight");
    } else {
        pageWidth = windowWidth * 0.5;
        pageHeight = windowWidth * 0.5;
        const pageOrientation = 0;
        console.log('Orientation is Landscape');
        console.log("pageWidth is " + pageWidth + " & " + pageHeight + " is pageHeight");
    } 

    createCanvas(pageWidth,pageHeight);

    background(20,20,20);
    rectMode(CENTER);
    
    //border
    fill(104,202,153);
    rect(pageWidth / 2,pageHeight / 2,
        pageHeight * 0.95,pageWidth * 0.95,
        25);

    //background
    fill(200,200,200);
    rect(pageWidth / 2,pageHeight / 2,
        pageWidth * 0.85,pageHeight * 0.85,
        25); 
        
}

////////////////////////////////////////////////////////////////////////////////////////////

//draw the pretty picture

function draw() {
  for (var c = 0; c < cols; c++) {
    for (var r = 0; r < rows; r++) {
        var XO = pageWidth*0.15 + c * 60;
        var YO = pageHeight*0.15 + r * 60;
        stroke(0);
        fill(200,200,200);
        rect(XO, YO, 60, 60);
    }
  }

    //curve
    
    x = pageWidth / 2 + 230 * sin(1 * t);
    y = pageHeight  / 2 +  230 * sin(3 * t + PI / 2);
  
    particleArray.push(new Particle(x, y, t));
    for (i=0; i<particleArray.length; i++) {
    particleArray[i].show(t);
  }
  if (particleArray.length > 700) {
    particleArray.shift();
 }
 t += .009;
}

function Particle(x, y, t) {
  this.x = x;
  this.y = y;
  this.t = t;
  
  this.show = function(currentT) {
    var _ratio = t / currentT;
    _alpha = map(_ratio, 0, 1, 0, 255); //points should fade out as time elaps
    noStroke();
    fill(255, 255, 255, _alpha);
    ellipse(x, y, 15);
    console.log(_alpha + ': alpha');
    console.log(t);
  }
}




////////////////////////////////////////////////////////////////////////////////////////////////

/* OLD Beloved drawing grid with lines instead of squares like a fool
 //how many square for grid
 let gridNum = 10 - 1;
 let offsetB = 0;
 
 let lineXA = pageWidth * 0.1;
 let lineXB = pageWidth * 0.9;
 let lineYA = pageHeight * 0.1 ;
 let lineYB = pageHeight * 0.9 ;

 // grid drawin - circle of hell pain and suffering, I started with lines and I die with lines. Squares works better but they're weak.
 
 while ( drawGrid <= gridNum ){
     console.log('drawGrid ' + drawGrid);

     let offset = drawGrid * (pageWidth / gridNum);
    
     console.log('Offset is ' + offset)
     console.log('OffsetB is ' + offsetB)
     
     fill(255,0,0);
     strokeWeight(2);
     line(
        lineXA+offset+offsetB,
        lineYA,
        lineXA+offset+offsetB,
        lineYB);
     line(
        lineXA,
        lineYA+offset+offsetB,
        lineXB,
        lineYA+offset+offsetB);
     
     console.log('XA = ' + lineXA + ',  XB = ' + lineXB + ',  YA = ' + lineYA + ',  YB = ' + lineYB);
     if(pageOrientation=1){
        offsetB = offsetB + 2.7
     }
     else{
        offsetB = offsetB + 1.2
     }
     
     drawGrid++

    }
    */