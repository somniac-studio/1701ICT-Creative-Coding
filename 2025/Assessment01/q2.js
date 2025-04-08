/*

In this exercise you will implement a game with a simple interaction with a ball.
The game starts when you press the UP arrow on the keyboard. A ball appears moving up
from the bottom of the canvas. You can then change the direction of the ball using the four
arrow keys. The ball will only stop moving when you click the mouse. If the ball is stopped,
pressing the UP arrow again should start the ball moving again (but no other keys).
When the ball goes beyond the canvas it should appear back (wrap) on the other side

*/

//define variables
let ball;
let speedX = 0;
let speedY = 0;
let isMoving = false;

//setup the canvas, and define the subset of variables for ball to define position
  function setup() {
    createCanvas(1000, 1000);

    ball = {
      x: width / 2,
      y: height / 2,
      size: 50,
      color: color(255,192,203),
    };

    describe(
        'A simple game where you control a ball, upon hitting the edge of the screen the ball wraps to the other side of the canvas. Start by hitting Up, stop by left clicking. '
      );
  }

  function draw() {
    background(220);

    //if the variable isMoving is true, ball should be moving at speed defined, and if edge is hit, wrap to other side of canvas. Flexible to any canvas size.
    if (isMoving) {
      ball.x += speedX;
      ball.y += speedY;

      //wrap the ball
      if (ball.x > width + ball.size / 2) ball.x = -ball.size / 2;
      if (ball.x < -ball.size / 2) ball.x = width + ball.size / 2;
      if (ball.y > height + ball.size / 2) ball.y = -ball.size / 2;
      if (ball.y < -ball.size / 2) ball.y = height + ball.size / 2;
    }

    //set the colour and draw the ball based on the variables determined in setup
    fill(ball.color);
    ellipse(ball.x, ball.y, ball.size, ball.size);
  }

    //start the game when isMoving is false, and UP_ARROW has been pressed, set IsMoving to true to enable the other controls
  function keyPressed() {
    if (keyCode === UP_ARROW) {
      if (!isMoving) {
        isMoving = true;
        speedX = 0;
        speedY = -5;
      }
    }

    // If isMoving is true, unlock the controls, each with a separate controllable speed
    if (isMoving) {
      if (keyCode === LEFT_ARROW) {
        speedX = -5;
        speedY = 0;
      } else if (keyCode === RIGHT_ARROW) {
        speedX = 5;
        speedY = 0;
      } else if (keyCode === DOWN_ARROW) {
        speedX = 0;
        speedY = 5;
      }
      else if (keyCode === UP_ARROW) {
        speedX = 0;
        speedY = -5;
      }
    }
  }
  
  //if left click happens, stop all movement and change isMoving to false to lock the game, and await UP_ARROW to start again. Position is held.
  function mousePressed() {
    isMoving = false;
    speedX = 0;
    speedY = 0;
  }