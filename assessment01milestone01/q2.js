function setup() {
    createCanvas(512,512);
    background(101,105,251);
    noLoop();   
}

//modify numbers to generate pie chart
const comedy = 40;
const action = 5;
const romance = 6;
const drama = 1;
const scifi = 4;


//calc pie slice degrees
let total = comedy + action + romance + drama + scifi;
console.log("total " + total);

let comdeg = [comedy / total] * 100 * 3.6; // 72 //72
let comPer = [comedy / total] * 100;
console.log("comdeg " + comdeg);
console.log("comPer = " + comPer + "%");

let actdeg = [action / total] * 100 * 3.6 + comdeg; // 90 + 72 // 162
let actPer = [action / total] * 100;
console.log("actdeg " + actdeg);
console.log("actPer = " + actPer + "%");

let romdeg = [romance / total] * 100 * 3.6 + actdeg; // 108 + 90 + 72 // 270
let romPer = [romance / total] * 100;
console.log("romdeg " + romdeg);
console.log("romPer = " + romPer + "%");

let dradeg = [drama / total] * 100 * 3.6 + romdeg; // 18 + 108 + 90 + 72 // 288
let draPer = [drama / total] * 100;
console.log("dradeg " + dradeg);
console.log("draPer = " + draPer + "%");

let scideg = [scifi / total] * 100 * 3.6 + dradeg; // 72 + 18 + 108 + 90 + 72 // 360
let sciPer = [scifi / total] * 100;
console.log("scideg " + scideg);
console.log("sciPer = " + sciPer + "%");

let totalPer = comPer + actPer + romPer + draPer + sciPer;
console.log("Total percentage is " + totalPer + "%");

//draw that sweet sweet pie (chart)
function draw() {
    angleMode(DEGREES);
    rectMode(CENTER);
    textAlign(CENTER, CENTER);

    //comedy yellow
    noStroke();
    fill(200,200,80);
    arc(256,210,400,400,
        0,comdeg,PIE
    );
    stroke(20);
    strokeWeight(2);
    rect(width / 6,450,
        width / 4,30,8);
    textSize(14);
    textStyle(BOLD);
    fill(255,255,255);
    text('Comedy | ' + round(comPer,1) + '%', width / 6 , 450);
    
    //action red
    noStroke();
    fill(255,80,80);
    arc(256,210,400,400,
        comdeg,actdeg,PIE
    );
    stroke(20);
    strokeWeight(2);
    rect(width / 3,490,
        width / 4, 30,8);
    textSize(14);
    textStyle(BOLD);
    fill(255,255,255);
    text('Action | ' + round(actPer,1) + '%',width / 3,490);

    //romance purple
    noStroke();
    fill(204,51,255);
    arc(256,210,400,400,
        actdeg,romdeg,PIE
    );
    stroke(20);
    strokeWeight(2);
    rect(width / 2,450,
        width / 4,30,8);
    textSize(14);
    textStyle(BOLD);
    fill(255,255,255);
    text('Romance | ' + round(romPer,1) + '%',width / 2, 450);


    //drama blue
    noStroke();
    fill(0,153,255);
    arc(256,210,400,400,
        romdeg,dradeg,PIE
    );
    stroke(20);
    strokeWeight(2);
    rect(width * 0.8333333333,450
        ,width / 4,30,8);
    textSize(14);
    textStyle(BOLD);
    fill(255,255,255);
    text('Drama | ' + round(draPer,1) + '%',width * 0.8333333333,450);
    
    //scifi green
    noStroke();
    fill(0,204,102);
    arc(256,210,400,400,
        dradeg,scideg,PIE
    );
    stroke(20);
    strokeWeight(2);
    rect(width * 0.6666666667,490,
        width / 4, 30,8);
    textSize(14);
    textStyle(BOLD); 
    fill(255,255,255);
    text('Sci-Fi | '+ round(sciPer,1) + '%',width * 0.6666666667,490);

}