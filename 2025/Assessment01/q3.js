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

let data = {
    "comedy" : 6,
    "action" : 8,
    "romance" : 3,
    "drama" : 5,
    "scifi" : 4
}

let barWidth;
let maxValue;

function setup() {
    createCanvas(1000, 1000);
    
    angleMode(DEGREES);
    //noCursor();
    frameRate(60);
    colorMode(RGB, 255);

    describe(
      'Creates a bar chart by taking in variables, calculating the highest amount, and amount of variables and then draws the chart based on that!'
    );
    
  }


function draw() {
    background(69);
    //DrawBarChar();
  }
  

function CalcBarWidth(){
    // takes the amount of items in data, counts them, ands add extra for spacing!
    barWidth = width / (Object.keys(data).length + 1);
}

function CalcMaxValue(){
    MaxValue = 0;
        for (let key in data) {
            if (data[key] > MaxValue) {
                MaxValue = data[key];
        }        
    }
}

function DrawBarChart(){
    let x = barWidth / 2;
}