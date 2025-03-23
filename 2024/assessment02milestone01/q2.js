/*
loadTSP(filename) (4 marks). Write this p5.js function that will read a TSP problem
from a .tsp file. For this assignment, we will only consider Euclidean distance
problems. The information you need to load in includes the problem name, total
number of cities, the id of each city, and the co-ordinates of those cities. You could
store the city information as 3 parallel arrays (ids, xcords, ycoordinates) or an array of
objects with an id, x and y value. You can find the TSPLIB documentation and the
dataset with Euclidean only problems on the course website. Your function should
take the name of a .tsp file to load. This can be called from the preload() function.
Hint: Reading the TSPLIB.pdf file can be a little daunting. Have a look at some of the
actual .tsp files (berlin52.tsp, a280.tsp). It should make the problem seem a lot easier.
-  DONE

b) showLoadedTSP() (5 marks). Write this function that will visualise a loaded problem.
You will need to find a way to scale the loaded problem to fit correctly on the canvas.
You may choose what shapes/colours to use to visualise the problem. You should
make sure you display the problem name and number of cities somewhere on the
canvas. - DONE

c) showSolution() (4 marks). Write this function that will visualise a solution to a loaded
problem from a file. You may assume that this function will only be used AFTER
showLoadedTSP() has already been run. You will need to load the .sol file in preload().
The first line of a .sol file contains the problem file name (you should check this
matches the loaded TSP). The second line contains the tour length, and the rest of the
file contains a list of ID’s (one on each line) that represents the order that the cities
should be connected to form the shortest tour. You should display the solution tour
distance on the canvas. Some sample .sol files have been provided on the course
website. - FAIL

Challenge (5 marks): Make the program animate the tour. The program should show the
salesman starting from the first city and smoothly moving between all the cities leaving
the tour as a trail behind them until they reach the last city and return back to the first
one. You can loop this animation if you wish. lerp command
 - FAIL */

var pageWidth;
var pageHeight;

//change this to load another file set
var file = 'a280';
//var file = 'berlin52';
//var file = 'ch150';

let ID = 0;
let X = 1;
let Y = 2;
let spacing;

let tokensX;
let tokensY;

let tempID;
let tempX;
let tempY;

let minX;
let maxX;
let minY;
let maxY;
////////////////////////////////////////////////////////////////////////////////////////



function preload() {
    loadTSP();
    console.log( file + ' has been loaded.')
}

////////////////////////////////////////////////////////////////////////////////////////


function setup() {
    console.log(spacing);
    if(windowWidth < windowHeight){
        pageWidth = windowHeight * 0.6;
        pageHeight = windowHeight * 0.6;
        const pageOrientation = 1;
        //console.log('Orientation is Portrait');
        //console.log("pageWidth is " + pageWidth + " & " + pageHeight + " is pageHeight");
    } else {
        pageWidth = windowHeight * 0.6;
        pageHeight = windowHeight * 0.6;
        const pageOrientation = 0;
        //console.log('Orientation is Landscape');
        //console.log("pageWidth is " + pageWidth + " & " + pageHeight + " is pageHeight");
    } 
    createCanvas(pageWidth,pageHeight);
    background(25,25,25);

}



////////////////////////////////////////////////////////////////////////////////////////

function loadTSP(){
    tspp = loadStrings('data/' + file + '.tsp');
    tspsol = loadStrings('data/' + file + '.sol')
}

////////////////////////////////////////////////////////////////////////////////////////


function showLoadedTSP(){
    if(file == 'a280')
    {
        minX = 8;
        maxX = 288;
        minY = 9;
        maxY = 169;
        console.log('a280 mins and maxes loaded')
    } 
    else if(file == 'berlin52')
    {
        minX = 25;
        maxX = 1740;
        minY = 5;
        maxY = 1175;
        console.log('berlin52 mins and maxes loaded')
    } 
    else if(file == 'ch150')
    {
        minX = 15.2145765106;
        maxX = 697.3881696597;
        minY = 0.4198814512;
        maxY = 677.0730379436;
        console.log('ch150 mins and maxes loaded')
    }

    noLoop();
    strokeWeight(2);
    let spacing = 1;

    const tempID = new Array(1);
    const tempX = new Array(1);
    const tempY = new Array(1);


    for(let i = 6; i < tspp.length-3; i ++) {
        //goes through and splits each row up
        let tokens = splitTokens(tspp[i]);
        //Gives console info
        print(tokens);
        
        //prints problem name
        textSize(15);
        fill('white');
        text(tspp[0], 10, 20);
        text(tspp[3], 10, 40);

       
        //uses the 3 pieces of info in each row to draw points
        if (tokens[ID]) {
            console.log(tokens[ID]);

            fill(255)
            noStroke();

            tokensX = map(tokens[X],minX,maxX,50,pageWidth-50,true);
            tokensY = map(tokens[Y],minY,maxY,50,pageWidth-50,true);

            append(tempID,tokens[ID]);
            append(tempX,tokensX);
            append(tempY,tokensY);

            textSize(10);
            text(tokens[ID],tokensX+3, tokensY+10);
            ellipse(tokensX, tokensY, 5, 5);

            point = createSprite(tokensX, tokensY , 5, 5)
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////


function showSolution(){
    console.log('important ' + tspsol[2])
    console.log('temp X is ' + tempX)
    console.log('temp Y is ' + tempY)
    /*salesman = createSprite(tempX[42], tempY[42], 200, 200);
    
    for(let j=2; j < tspsol.length; j++){
        for (let i = 6; i < tspp.length-3; i ++){
        let tokens = splitTokens(tspp[i]);
        let solTokens = splitTokens(tspsol[j]);
        console.log(tspsol[j]);
        salesman.attractionPoint(1,)
        }

   } */
}

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////


function draw(){
    //show loaded problem
    showLoadedTSP();

    //show the solution
    showSolution();

    drawSprites();

    
    console.log(tempID);
}