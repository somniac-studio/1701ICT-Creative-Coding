/*

In this exercise you will implement a game with a simple interaction with a ball.
The game starts when you press the UP arrow on the keyboard. A ball appears moving up
from the bottom of the canvas. You can then change the direction of the ball using the four
arrow keys. The ball will only stop moving when you click the mouse. If the ball is stopped,
pressing the UP arrow again should start the ball moving again (but no other keys).
When the ball goes beyond the canvas it should appear back (wrap) on the other side
*/


let ball;
let speedX = 0;
let speedY = 0;
let isMoving = false;

  function setup() {
    createCanvas(1000, 1000);

    ball = {
      x: width / 2,
      y: height,
      size: 50,
      color: color(255, 0, 0),
    };

    describe(
        ''
      );
  }

  function draw() {
    background(220);

    if (isMoving) {
      ball.x += speedX;
      ball.y += speedY;

      if (ball.x > width + ball.size / 2) ball.x = -ball.size / 2;
      if (ball.x < -ball.size / 2) ball.x = width + ball.size / 2;
      if (ball.y > height + ball.size / 2) ball.y = -ball.size / 2;
      if (ball.y < -ball.size / 2) ball.y = height + ball.size / 2;
    }

    fill(ball.color);
    ellipse(ball.x, ball.y, ball.size, ball.size);
  }

  function keyPressed() {
    if (keyCode === UP_ARROW) {
      if (!isMoving) {
        isMoving = true;
        speedX = 0;
        speedY = -5;
      }
    }

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

  function mousePressed() {
    isMoving = false;
    speedX = 0;
    speedY = 0;
  }