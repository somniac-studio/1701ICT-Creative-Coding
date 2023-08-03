// Config
const BOMB_COUNT = 3;
const BOMB_FLASH_DURATION = 5;
const BOMBS_PER_LEVEL = 1;
const BOSS_GRACE_PERIOD = 60;
const BOSS_SPAWN_DELAY = 60;
const INVULN_TIME = 10;
let   MAP_HEIGHT = 700;
const MODEL_LINE_ALPHA = 127;
const PLAYER_FIRE_RATE = 10;
const PLAYER_HP = 8;
const PLAYER_RADIUS = 6;
const PLAYER_SPEED = 5;
const SCORE_UPDATE_SPEED = 4;
const SLOWDOWN_ALPHA = 95;
const SLOWDOWN_ALPHA_FULL = 127;
const SLOWDOWN_DT = 0.4;
const SLOWDOWN_DURATION = 120;
const SLOWDOWN_WAIT_NEXT = 600;
const SPAWN_GRACE_PERIOD = 60;
const UI_PANEL_HEIGHT = 150;
const WORLD_CEILING = -50;


// Background & Assets
    //fonts
    let titleFont;
    let bodyFont;

    //music
    let bgmPlaying = 0;
    let bgm01;
    let bgm02;
    let bgm03;

    //sfx
    let sfxDamage;
    let sfxDeath;
    let sfxGunshotA;
    let sfxGunshotB;
    let sfxPowerup;

    //textures
    let texBoss01;
    
    let texPupBomb;
    let texPupBonusPoints;
    let texPupDoublePoints;
    let texPupDualFire;
    let texPupHealth;
    let texPupTripleShot;
    let texButtonA;
    let texMuteOn;
    let texMuteOff;

    let texShipPlayer;

    //video
    let vidBG;
    let videoBG;

// cds
let bossTime;
let flashTime;
let nextSlowdownTime;
let slowTime;
let spawnTime;

// Enemies & Items
let boss;
let bullets;
let enemies;
let items;
let pl;
let ps;
let walls;

// Games current state
let currentScreen = 0; //change to 4 to go straight to game, 0 for full boot
let loadingState = true;

let curLevel = 1;
let level;
let levelScore;
let paused = false;
let score;
let scoreMult;
let scoreToAdd;
let toSpawn;
let toSpawnBoss;
    let soundOn = 1;
    let startButton;
    let leaderButton;
    let settingsButton;

// Powerups
let bombs;


// Add a score
function addScore(points) {
    scoreToAdd += points;
}

// Display a health bar for a boss
function bossHealthBar() {
    let h = boss.hp / boss.maxHp;
    if (h === 0) return;

    let c = color(215, 60, 44, 191);
    fill(c);
    noStroke();
    rectMode(CENTER);
    rect(width/2 - 0.5, 10, h * (width - 200), 10);
}

// Clear all entities (except player)
function clearEntities() {
    boss = null;
    bullets = [];
    enemies = [];
    items = [];
    ps = [];
    walls = [];
}

// Update all cooldowns & timers
function cd() {
    if (flashTime > 0) flashTime--;

    if (!paused) {
        if (bossTime > 0) {
            bossTime -= dt();
            if (bossTime <= 0) spawnBoss();
        }

        if (nextSlowdownTime > 0 && slowTime === 0) nextSlowdownTime -= dt();
        if (nextSlowdownTime < 0) nextSlowdownTime = 0;

        if (slowTime > 0) slowTime -= dt();
        if (slowTime < 0) slowTime = 0;

        if (spawnTime > 0) spawnTime -= dt();
        if (spawnTime < 0) spawnTime = 0;

        if (toSpawnBoss && enemies.length === 0) {
            toSpawnBoss = false;
            bossTime = BOSS_SPAWN_DELAY;
        }
    }
}

// Return current pause state
function dt() {
    if (paused) {
        return 0;
    } else if (slowTime > 0) {
        return SLOWDOWN_DT;
    }
    return 1;
}

// Draw bomb
function drawBomb(x, y) {
    fill('#007C21');
    stroke(0, MODEL_LINE_ALPHA);
    rectMode(CORNER);
    rect(x, y, 20, 20);
}

// Draw heart
function drawHeart(x, y, empty) {
    fill(empty ? 0 : '#D73C2C');
    stroke(0, MODEL_LINE_ALPHA);
    rectMode(CORNER);
    rect(x, y, 20, 20);
}

// Load a level
function loadLevel() {
    if (LEVEL[level + 1]) {
        level++;
        curLevel = LEVEL[level];
        toSpawn = curLevel.spawnCount;

        // Reset cooldowns & timers
        spawnTime = BOSS_GRACE_PERIOD;

        // Reset powerups
        bombs += BOMBS_PER_LEVEL;

        // Save score
        levelScore = score + scoreToAdd;
    }
}

// Respawn everything for current level
function reloadLevel() {
    curLevel = LEVEL[level];
    toSpawn = curLevel.spawnCount;
    toSpawnBoss = false;

    // Clear all entities
    clearEntities();
    spawnPlayer();

    // Reset cds
    bossTime = 0;
    flashTime = 0;
    nextSlowdownTime = 0;
    slowTime = 0;
    spawnTime = SPAWN_GRACE_PERIOD;

    // Reset powerups
    bombs = BOMB_COUNT;
    slowdownReady = true;

    // Reset score
    score = levelScore;
    scoreToAdd = 0;
}

// Reset game to first level
function resetGame() {
    // Game state
    level = 0;
    levelScore = 0;
    score = 0;
    scoreMult = 1;
    scoreToAdd = 0;
    reloadLevel();
}

// Spawn a boss
function spawnBoss() {
    if (curLevel.boss) {
        boss = new Boss(width/2, WORLD_CEILING);
        applyTemplate(boss, BOSS[curLevel.boss]);
        boss.init();
    } else {
        loadLevel();
    }
}

// Spawn an enemy
function spawnEnemy() {
    spawnTime = randInt(curLevel.spawnTimeMin, curLevel.spawnTimeMax);
    let type = randWeight(curLevel.enemy, curLevel.enemyWeight);
    let e = new Enemy(random(width), WORLD_CEILING);
    applyTemplate(e, ENEMY[type]);
    e.init();

    // Determine spawn location
    if (!e.spawnAboveMap) {
        e.pos.y = MAP_HEIGHT - WORLD_CEILING;
    }
    
    enemies.push(e);
}

// Spawn an item
function spawnItem(x, y) {
    if (typeof x === 'undefined' || typeof y === 'undefined') {
        x = random(width);
        y = WORLD_CEILING;
    }
    let type = randWeight(curLevel.item, curLevel.itemWeight);
    items.push(new Item(x, y, ITEM[type]));
}

// Spawn the player at the correct coords
function spawnPlayer() {
    pl = new Player(width/2, MAP_HEIGHT * 3/4);
    pl.init();
}


///////////////////////////////////////////////////////////////////////////////////////////////////

// Draw player bombs
function uiBombs() {
    for (let i = 0; i < bombs; i++) {
        drawBomb(20 + 30*i, height - UI_PANEL_HEIGHT + 60);
    }
}

// Draw player health
function uiHealth() {
    let empty = pl.maxHp - (pl.hp - 1);
    for (let i = pl.maxHp; i >= 0; i--) {
        drawHeart(20 + 30*i, height - UI_PANEL_HEIGHT + 20, --empty > 0);
    }
}

function uiScore() {
    textAlign(CENTER);
    fill(255,255,0)
    textFont(bodyFont);
    textSize(24);
    text('Score : ' + score, width/2, height-UI_PANEL_HEIGHT +40)
}

function uiLevel() {
    textAlign(CENTER);
    fill(255,255,0)
    textFont(bodyFont);
    textSize(24);
    text('Level : ' + (level + 1), width/2, height-UI_PANEL_HEIGHT +80)
}

// Draw the UI panel
function uiPanel() {
    // Draw grey rectangle
    fill(35);
    stroke(241, 196, 15);
    rectMode(CORNER);
    rect(0, height - UI_PANEL_HEIGHT, width, UI_PANEL_HEIGHT);

    // Draw all UI panel elements
    strokeWeight(2);
    uiBombs();
    uiHealth();
    uiSlowdown();
    uiScore();
    uiLevel();
    strokeWeight(1);
}

// Draw indicator of slowdown recharge status
function uiSlowdown() {
    push();
    translate(width - 50, height - 50);
    rotate(180);
    stroke(0, MODEL_LINE_ALPHA);

    let loadPercent = (SLOWDOWN_WAIT_NEXT - nextSlowdownTime) / SLOWDOWN_WAIT_NEXT;
    let angle = 360 * loadPercent;
    
    // Draw blue/green portion
    if (angle > 0) {
        if (angle === 360) {
            fill(55, 219, 208, SLOWDOWN_ALPHA_FULL);
        } else {
            fill(55, 219, 208, SLOWDOWN_ALPHA);
        }
        arc(0, 0, 40, 40, 90, 90 + angle);
    }

    // Draw red portion
    if (angle < 360) {
        fill(231, 76, 60, SLOWDOWN_ALPHA);
        arc(0, 0, 40, 40, 90 + angle, 90);
    }

    pop();
}

///////////////////////////////////////////////////////////////////////////////////////////////////

// Update the score by slowly adding (looks cooler)
function updateScore() {
    if (scoreToAdd >= SCORE_UPDATE_SPEED) {
        scoreToAdd -= SCORE_UPDATE_SPEED;
        score += SCORE_UPDATE_SPEED * scoreMult;
    } else {
        score += scoreToAdd * scoreMult;
        scoreToAdd = 0;
    }
}

// Use a bomb powerup
function useBomb() {
    if (bombs > 0 && !paused) {
        bombs--;
        bullets = [];
        pl.invulnTime = INVULN_TIME;
        flashTime = BOMB_FLASH_DURATION;
    }
}

// Use a slowdown powerup
function useSlowdown() {
    if (nextSlowdownTime === 0 && !paused) {
        slowdownReady = false;
        slowTime = SLOWDOWN_DURATION;
        nextSlowdownTime = SLOWDOWN_WAIT_NEXT;
    }
}

function uiLoadingScreen(){
    currentScreen = 1;
}

function uiMainmenu(){
    background(15);
    let img = vidBG.get();
    image(img,0,0);


    textAlign(CENTER);
    rectMode(CENTER);
    fill(255);
    textSize(70)
    textFont(titleFont);
    text('Pew Pew Space Game', width/2, height/2-150)

    startButton = createSprite(width/2,height/2+80)
    startButton.addImage(texButtonA);
    startButton.onMousePressed = function(){
        bgm01.stop();
        bgmPlaying=0;
        resetGame();
        currentScreen=4
    }
    //startButton.mousePressed(bgm01.stop());
    textSize(36)
    textFont(bodyFont);
    text('START', width/2, height/2+60)

    leaderButton = createSprite(width/2,height/2+160)
    leaderButton.addImage(texButtonA);
    //leaderButton.mousePressed(currentScreen=2)
    text('LEADERBOARDS', width/2, height/2+140)
    

    settingsButton = createSprite(width/2,height/2+240)
    settingsButton.addImage(texButtonA);
    //settingsButton.mousePressed(currentScreen=3)
    text('SETTINGS', width/2, height/2+220)

    muteButton = createSprite(32,32);
    muteButton.addImage(texMuteOff,texMuteOff);
    muteButton.addImage(texMuteOn,texMuteOn);
    if (soundOn=1){
        muteButton.changeImage(texMuteOff)
        muteButton.onMousePressed = function(){
            soundOn=0
        }
    }
    else
    {
        muteButton.changeImage(texMuteOn);
        muteButton.onMousePressed = function(){
            soundOn=1
        }
    }
    drawSprites();
}



function uiLeaderboard(){

}

function uiSettings(){

}

////////////////////////////////////////////////////////////
///////////// BEGINNING OF NORMAL P5 NONSENSE //////////////
////////////////////////////////////////////////////////////
//                                                        //
/* Main p5.js functions */
function preload(){
    //fonts
    titleFont = loadFont('fonts/vermin.ttf');
    bodyFont = loadFont('fonts/runescape.ttf');

    //textures
    texBoss01 = loadImage('data/textures/enemy-boss1.png');
    
    texPupBomb = loadImage('data/textures/pup-bomb.png');
    texPupBonusPoints = loadImage('data/textures/pup-bonuspoints.png');
    texPupDoublePoints = loadImage('data/textures/pup-doublepoints.png');
    texPupDualFire = loadImage('data/textures/pup-dualfire.png');
    texPupHealth = loadImage('data/textures/pup-health.png');
    texPupTripleShot = loadImage('data/textures/pup-tripleshot.png');

    texButtonA = loadImage('data/textures/buttonA.png')
    texMuteOff = loadImage('data/textures/SoundOn.png')
    texMuteOn = loadImage('data/textures/SoundOff.png')

    texShipPlayer = loadImage('data/textures/ship-player.png');

    //bgm
    bgm01 = loadSound('data/sound/bgm/LoseYourHead.mp3')
    bgm02 = loadSound('data/sound/bgm/RedSkies.mp3')
    bgm03 = loadSound('data/sound/bgm/RisingHero.mp3')

    //sounds
    sfxDamage = loadSound('data/sound/sfx/damage.mp3')
    sfxDeath = loadSound('data/sound/sfx/death.mp3')
    sfxGunshotA = loadSound('data/sound/sfx/gunshot_A.mp3')
    sfxGunshotB = loadSound('data/sound/sfx/gunshot_B.mp3')
    sfxPowerup = loadSound('data/sound/sfx/powerup.mp3')

    //JSON
    //highscores = loadJSON('data/highscores.json');
}


function setup() {
    // Ensure game can fit vertically inside screen
    let maxSize = MAP_HEIGHT + UI_PANEL_HEIGHT + 2;
    let pageHeight = windowHeight > maxSize ? maxSize : windowHeight;
    MAP_HEIGHT = pageHeight - UI_PANEL_HEIGHT;
    let c = createCanvas(MAP_HEIGHT+UI_PANEL_HEIGHT, pageHeight +2);
    c.parent('game');

    vidBG = createVideo("data/video/videoBG.mp4");
    vidBG.size(width, height);
    vidBG.volume(0);
    vidBG.loop();
    vidBG.hide();

    // Configure p5.js
    angleMode(DEGREES);
    ellipseMode(RADIUS);

    // Begin level
    resetGame();
}

function draw() {
    //loading screen
    if(currentScreen == 0){
        uiLoadingScreen();
    }

    //main menu
    if(currentScreen == 1){
        uiMainmenu();
    }
    
    //leaderboards
    if(currentScreen == 2){
        uiLeaderboard();
    }
    
    //settings
    if(currentScreen == 3){
        uiSettings();
    }

    //main game
    if(currentScreen == 4){
        if(soundOn == 1 && bgmPlaying == 0){
            bgm02.play()
            bgmPlaying = 1
        }
    background(15);

    // Update game status display
    if (!paused) updateScore();

    // Spawn enemies or boss
    if (!paused && spawnTime === 0 && toSpawn > 0) {
        toSpawn--;
        if (toSpawn === 0) toSpawnBoss = true;
        spawnEnemy();
    }

    // Update and draw all entities
    loopOver(items);
    loopOver(bullets);
    if (boss) boss.act();
    loopOver(enemies);
    pl.act();
    loopOver(walls);
    loopOver(ps);

    // Update all cds
    cd();

    // Draw UI panel
    uiPanel();

    // Draw boss health bar
    if (boss) bossHealthBar();

    // Check for boss death
    if (boss && boss.dead) {
        boss.onDeath();
        boss = null;
    }

    // Check for player death
    if (pl.dead) pl.onDeath();
    }
}

function keyPressed() {
    // Use a bomb
    if (key === 'C' || key === 'M') useBomb();

    // Pause
    if (key === 'P' || key === '13' ) paused = !paused;

    // Use a slowdown
    if (key === 'X' || key === 'N') useSlowdown();

    if (key === '27') currentScreen = 0;
}
