var pageWidth;
var pageHeight;
let sq1;
let sq2;
let sq3;
let sq4;
let sq5;
let sq6;

function setup() {
    if(windowWidth < windowHeight){
        pageWidth = windowHeight * 0.6;
        pageHeight = windowHeight * 0.4;
        console.log("pageWidth is " + pageWidth + " & " + pageHeight + " is pageHeight");
    } else {
        pageWidth = windowWidth * 0.6;
        pageHeight = windowWidth * 0.4;
        console.log("pageWidth is " + pageWidth + " & " + pageHeight + " is pageHeight");
    }

    createCanvas(pageWidth,pageHeight);
    sq1 = createGraphics(pageWidth/3,pageHeight/2);
    sq2 = createGraphics(pageWidth/3,pageHeight/2);
    sq3 = createGraphics(pageWidth/3,pageHeight/2);
    sq4 = createGraphics(pageWidth/3,pageHeight/2);
    sq5 = createGraphics(pageWidth/3,pageHeight/2);
    sq6 = createGraphics(pageWidth/3,pageHeight/2);
    background(5,5,5);

    pixelDensity(1);
}


function draw(){
    let sqWidth = pageWidth/3;
    let sqHeight = pageHeight/2;

    
    
/////////////////////////////////////////////////////
    //1
    sq1.background(240,25,25) // RED

    //draw horizontal lines
    sq1.stroke(15,15,255); //blue
    sq1.strokeWeight(3);
    for(let i = 0; i<100; i++)
    {
    x=i;
    y=6;
    let offset=i*12
    sq1.line(0,y+offset,width,y+offset);
    }


    sq1.fill(15,15,255); //blue
    sq1.ellipse(width/6,height/4,
        width/6,height/4);

/////////////////////////////////////////////////////
    //2
    sq2.background(230,200,15) // YELLOW
    sq2.noStroke();

    //draw horizontal lines
    sq2.stroke(240,25,25); // RED
    sq2.strokeWeight(3);
    for(let i = 0; i<100; i++)
    {
    x=i;
    y=6;
    let offset=i*12
    sq2.line(0,y+offset,width,y+offset);
    }

    sq2.fill(240,25,25); // RED
    sq2.rectMode(CENTER);
    sq2.square(width/6*1,height/4,width/6);
    

/////////////////////////////////////////////////////
    //3
    sq3.background(20,40,210) // BLUE
    sq3.noStroke();

    //draw horizontal lines
    sq3.stroke(230,200,15); // YELLOW
    sq3.strokeWeight(3);
    for(let i = 0; i<100; i++)
    {
    x=i;
    y=6;
    let offset=i*12
    sq3.line(0,y+offset,width,y+offset);
    }

    sq3.fill(230,200,15); //yellow
    sq3.triangle(
        width/6*1,height*0.12,
        width/6*0.3,height*0.38,
        width/6*1.7,height*0.38
            );


/////////////////////////////////////////////////////
    //4
    sq4.background(230,10,50) // RED 2

    //draw horizontal lines
    sq4.stroke(230,180,15); // YELLOW
    sq4.strokeWeight(3);
    for(let i = 0; i<100; i++)
    {
    x=i;
    y=6;
    let offset=i*12
    sq4.line(0,y+offset,width,y+offset);
    }

    sq4.rectMode(CENTER);
    sq4.fill(230,180,15);
    sq4.rect(width/6,height/4, width/5,height/7)
/////////////////////////////////////////////////////
    //5
    sq5.background(230,180,15) // YELLOW 2

    //draw horizontal lines
    sq5.stroke(15,20,200); // BLUE
    sq5.strokeWeight(3);
    for(let i = 0; i<100; i++)
    {
    x=i;
    y=6;
    let offset=i*12
    sq5.line(0,y+offset,width,y+offset);
    }

    sq5.fill(15,20,200);
    sq5.quad(
        width/4,height/6,
        width/12,height/6,
        width/24,height/3,
        width/24*7,height/3
        );

/////////////////////////////////////////////////////
    //6
    sq6.background(15,20,200) // BLUE 2

    //draw horizontal lines
    sq6.stroke(230,10,50); // RED
    sq6.strokeWeight(3);
    for(let i = 0; i<100; i++)
    {
    x=i;
    y=6;
    let offset=i*12
    sq6.line(0,y+offset,width,y+offset);
    }

    sq6.fill(230,10,50);
    sq6.quad(
        width/24*7,height/6,
        width/12,height/6,
        width/24,height/3,
        width/24*6,height/3
        );

/////////////////////////////////////////////////////

    image(sq1,(pageWidth/3)*0,0);
    image(sq2,(pageWidth/3)*1,0);
    image(sq3,(pageWidth/3)*2,0); 
    image(sq4,(pageWidth/3)*0,pageHeight/2);
    image(sq5,(pageWidth/3)*1,pageHeight/2);
    image(sq6,(pageWidth/3)*2,pageHeight/2);

}