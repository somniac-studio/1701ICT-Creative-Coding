/*
You should annotate each column of the bar chart with its label, and have the y-axis labeled
with 5 grid lines. An example is provided below.
Your code should allow for different bar charts to be created by storing the count for each
movie type in variables that can be changed. 
The y-axis labels of the bar chart must change to suit the data. 
The gridlines should always occur at whole numbers, and be evenly spaced.
That means that, as we need 5 gridlines, the top gridline value must be evenly divisible by 5.
The value at each subsequent gridline is simply the top value minus the result of the
aforementioned division.
One of the first challenges to solve is to calculate the smallest value that is divisible by 5 that
is larger than the largest individual “bar”. 
It is acceptable to “hard code” the largest value as a variable alongside your category variables. 
To clarify; the global variables should be:
*/

let comedy = 6;
let action = 8;
let romance = 3;
let drama = 5;
let scifi = 4;

let largest = 8;

function setup() {
    createCanvas(1000, 1000);
    
    angleMode(DEGREES);
    noCursor();
    frameRate(60);
    colorMode(RGB, 255);

    describe(
      ''
    );
    
  }


function draw() {
    
  }
  