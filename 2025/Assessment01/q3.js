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
    "Comedy": 6,
    "Action": 8,
    "Romance": 3,
    "Drama": 5,
    "Sci-fi": 4
};

let barWidth;
let maxValue;
let barColours = {};


function setup() {
    createCanvas(1000, 1000);
    describe(
      'Creates a bar chart by taking in variables, calculating the highest amount, and amount of variables and then draws the chart based on that!'
    );
    calcBarWidth();
    calcMaxValue();
    assignColours();
}


//
function draw() {
    background(200);
    drawBarChart();
    drawKey();
}


//
function calcBarWidth(){
    // takes the amount of items in data, counts them, ands add extra for spacing!
    barWidth = width / (Object.keys(data).length + 1);
}

function calcMaxValue(){
    maxValue = 0;
        for (let key in data) {
            if (data[key] > maxValue) {
                maxValue = data[key];
        }        
    }
}

function assignColours(){
    for (let key in data) {
        barColours[key] = color(random(20,255), random(20,255), random(20,255));
    }
}


function drawBarChart(){
    let x = barWidth / 2;

    for (let key in data) {

        let barHeight = map(data[key], 0, maxValue, 0, height - 50); // Scale to Canvas Height by taking height, and removing 50
        fill(barColours[key]); //colour
        strokeWeight(0);
        rect(x, height - barHeight - 20, barWidth * 0.8, barHeight);

        push();
            fill(255);
            textFont('Comic Sans MS');
            textAlign(CENTER, BOTTOM);
            textSize(28);
            textStyle(BOLD);
            stroke(15);
            strokeWeight(6);
            text(key, x + (barWidth * 0.4), height - 25); // Add Label to Bar
        pop();

        x += barWidth;  // moves to next bar    }
    }
}

function drawKey(){
    let keyX = width * 0.8; // Position the key on the right side
    let keyY = 50;
    let keyHeight = 200; // Height of the key
    let numTicks = 5; // Number of ticks on the key

  // Draw key outline
  stroke(0);
  noFill();
  rect(keyX, keyY, 20, keyHeight);

  // Draw ticks and labels
    for (let i = 0; i <= numTicks; i++) {
        let y = map(i, 0, numTicks, keyY + keyHeight, keyY);
        let value = map(i, 0, numTicks, 0, maxVal);

    stroke(0);
    line(keyX, y, keyX + 10, y); // Draw tick

    noStroke();
    fill(0);
    textAlign(LEFT, CENTER);
    textSize(10);
    text(round(value), keyX + 25, y); // Draw value label
  }
    noStroke();
    fill(0);
    textAlign(CENTER, BOTTOM);
    textSize(12);
    text("Value", keyX + 10, keyY - 5); //Draw the label 'value' above the key.
}
