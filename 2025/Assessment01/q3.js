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

//define our data, this should be changeable as well as able to support more or less data.
let data = {
    "Comedy": 6,
    "Action": 8,
    "Romance": 3,
    "Drama": 5,
    "Sci-fi": 4,
    //"Gaming": 25
};
//define variables
let barWidth;
let maxValue;
let barColours = {};

let barHeight

//setup canvas and run calculation functions to define how wide each bar should be, how far apart they need to be, what our highest value is, and what colours the bars will be. (random)
function setup() {
    createCanvas(1000, 1000);
    describe(
      'Creates a bar chart by taking in variables, calculating the highest amount, and amount of variables and then draws the chart based on that!'
    );
    calcBarWidth();
    calcMaxValue();
    assignColours();
}


//draw the background, then the chart and the key.
function draw() {
    background(200);
    drawKey();
    drawBarChart();
}


//
function calcBarWidth(){
    // takes the amount of items in data, counts them, ands add extra for spacing!
    barWidth = width / (Object.keys(data).length + 1);
}

//resets the maxValue, and then checks if the highest value is higher than our preset (which is 0 but can be higher), if it is higher, it becomes the new max value. You could set it to 10 for example, and only if some data is above that, would it change to the new data based number
function calcMaxValue(){
    maxValue = 10;
    for (let key in data) {
        if (data[key] > maxValue) {
            maxValue = data[key];
        }        
    }
    // Ensure maxValue is divisible by 5
    if (maxValue % 5 !== 0) {
        maxValue = maxValue + (5 - (maxValue % 5));
    }

}



//For every variable in data, assign a colour to each one
function assignColours(){
    for (let key in data) {
        barColours[key] = color(random(20,255), random(20,255), random(20,255));
    }
}

//function used to draw the bar chart
function drawBarChart(){
    let x = barWidth / 2; //using the barWidth variable from earlier to scale and place our bars.

    //for each var in data, we scale the height by the maxvalue so we know how tall it should be, and then draw, using the previous bars x value to draw along the width of the canvas.
    for (let key in data) {

        let barHeight = map(data[key], 0, maxValue, 0, height - 50); // Scale to Canvas Height by taking height, and removing 50
        fill(barColours[key]); //colour
        strokeWeight(0);
        rect(x, height - barHeight - 20, barWidth * 0.8, barHeight);

        //add text to label the bar.
        push();
            fill(255);
            textFont('Comic Sans MS');
            textAlign(CENTER, TOP);
            textSize(28);
            textStyle(BOLD);
            stroke(15);
            strokeWeight(6);
            text(key, x + (barWidth * 0.4), height - 50); // Add Label to Bar

        x += barWidth;  // moves to next bar    }
    }
}

function drawKey(){
    let keyX = width * 0.03; // Position the key on the left side
    let keyY = 30;
    let keyHeight = height - 50 ; // Height of the key
    let numTicks = 10; // Number of ticks on the key
    let tickSpacing = maxValue / numTicks;

  // Draw key outline
    stroke(10);
    fill(0);
    rect(keyX + 5, keyY + 2, 10, height - 54);


  // Draw ticks and labels
    for (let i = 0; i <= numTicks; i++) {
        let y = map(i, 0, numTicks, keyY + keyHeight, keyY); // Calculate y position for each tick
        let value = 0 + (i * tickSpacing); // Calculate the value for each tick

        stroke(0);
        strokeWeight(1);
        line(keyX + 11, y, width * 0.95, y); // Draw tick

        // Draw label for each tick
        fill(0);
        noStroke();
        textSize(15);
        textAlign(RIGHT, CENTER);
        text(value, keyX, y);
  }

}

//I redid the key last minute so it's a bit scuffed :(