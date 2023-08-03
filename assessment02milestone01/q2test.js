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

b) showLoadedTSP() (5 marks). Write this function that will visualise a loaded problem.
You will need to find a way to scale the loaded problem to fit correctly on the canvas.
You may choose what shapes/colours to use to visualise the problem. You should
make sure you display the problem name and number of cities somewhere on the
canvas.

c) showSolution() (4 marks). Write this function that will visualise a solution to a loaded
problem from a file. You may assume that this function will only be used AFTER
showLoadedTSP() has already been run. You will need to load the .sol file in preload().
The first line of a .sol file contains the problem file name (you should check this
matches the loaded TSP). The second line contains the tour length, and the rest of the
file contains a list of ID’s (one on each line) that represents the order that the cities
should be connected to form the shortest tour. You should display the solution tour
distance on the canvas. Some sample .sol files have been provided on the course
website.

Challenge (5 marks): Make the program animate the tour. The program should show the
salesman starting from the first city and smoothly moving between all the cities leaving
the tour as a trail behind them until they reach the last city and return back to the first
one. You can loop this animation if you wish. lerp command
*/

var pageWidth
var pageHeight


let fileContent;
let ID = 0;
let X = 1;
let Y = 2;
let solution;
let loadsol;
let spacing = 3.5;

function preload() {
    loadTSP();
}

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
    background(25,25,25);
    rectMode(CENTER);
}

function draw() {
    background(200,200,200);
    noLoop();
    //Problem
    showLoadedTSP();
    //Solution
    loadSol();
}

function loadTSP() {
    //change this to load different file
    fileContent = loadStrings('data/a280.tsp');
}

function showLoadedTSP() {
    strokeWeight(2);
    for(let i = 0; i < fileContent.length; i ++) {
        let tokens = splitTokens(fileContent[i]);
        //Gives console info
        print(tokens);
        
        //prints problem name
        textSize(15);
        fill('black');
        text('PROBLEM' + ' ' + fileContent[0], 10, 20);

        //prints city numbers
        text(fileContent[3], 10, 50);

        //ellipses show the cities, denoted as tokens to draw
        if (tokens[ID]) {
            fill( random(15,240), random(15,240), random(15,240) )
            noStroke();
            ellipse(tokens[X] * spacing, tokens[Y] * spacing, 15, 15);
        }
    }
}
/*
function loadSolution(){
    solution = new Array(solution.length);
    for(let i = 2; i < solution.length; i ++){

    let solutionTokens = splitTokens(solution[i]);
    for(let j = 0; j < solutionTokens.length; j ++){

      solution[i] = solutionTokens.length[0]

      //printsolution
      if(solution[i] == coordinates[i].ID){
        print(coordinates[i].ID, coordinates[i].X, coordinates[i].Y)
      }
    }
  }
}*/

function loadSol(){
    loadsol = new Array(loadsol.length);
    for(let i = 2; i < loadsol.length; i ++){
        let soltokens = splitTokens(sol[i]);
    for(let j = 0; j < soltokens.length; j ++){
      loadsol[i] = soltoken.length[0]
      //printsolution
      if(loadsol[i] == coords[i].ID){
        print(coords[i].ID, coords[i].X, coords[i].Y)
      }
    }
}
}