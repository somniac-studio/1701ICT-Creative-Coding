/* GOAL LIST */
// Working main menu with
//      - settings for audio
//      - leaderboard access
//      - stat screen
//      - new game button
//      - animated title

// Leaderboard / score tracking
//      - save high score on game end
//      - display top 10 scores
//      - write to & read file on game complete

// Main Game
//      - WASD to Fly
//      - Space to shoot

//      - Button prompts in corner that animate on press
//      - show current score in top left corner

//      - enemies spawn and fire bullets at player. More enemies spawn based on time survived.






var pageWidth;
var pageHeight;

// DEPENDENTS
let mode = 1;
let shipVelocity;
let projectileVelocity;
let scrollSpeed;
let currentScore;
highscore = new Array;

// OBJECTS
let ship;
let bullet;
let missile;
let laser;

// GROUPS
let GUIOverlay;
let GUIMenu;
let background;
let playerOwned;
let hostileOwned;

///////////////////////// STARTUP //////////////////////////

function preload(){
highscores = loadAsStrings(data/highscores.txt);
}

function setup(){
createCanvas(1280,720);

GUIOverlay = new Group();
GUIMenu = new Group();
Background = new Group();

playerOwned = new Group();
hostileOwned = new Group();


}

///////////////////////// FUNCTIONS ////////////////////////////

function menu(){

}

function overlay(){

}

function ship(){

}

function shoot(){

}

function scrollingBG(){

}

//////////////////////////////////////////////////////////////

function draw(){
    background(15);

    if(mode == 1){
        //main menu
        //menu();
    }
    if(mode == 2){
        //leaderboard
        
    }
    if(mode == 3){
        //gameplay
    }

}

