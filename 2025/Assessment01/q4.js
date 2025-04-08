/*

For this question, you will draw an animated solar system using p5js.

a. Set the background colour to black. Draw the Sun in the middle as a yellow circle of
size 100.

b. Draw three smaller circles to represent planets and place them at distances of 150,
250 and 350 from the centre. The sizes of these planets should be 20, 40 and 60
respectively. Draw their circular orbits in a faint grey. You will need to think about
how to position and size these orbit tracks. (2 marks)

c. Animate the planets so they orbit the sun at different speeds, following their orbit
track. The closest planet should be the fastest, the middle planet the slowest, and
the outer planet in between (you may select the speeds). To calculate the position of
a planet in each frame, you will need to use the trigonometry discussed in lecture
3.4. (2 marks)

d. Add a small moon of size 10 that orbits the outer planet at a distance of 50 from the
centre of that planet. Animate this small moon so it orbits the planet in the opposite
direction that the planet orbits the sun. (2 marks)
*/

let angles = [0, 0, 0];
let moonAngle = 0;
let stars = [];

//setup the canvas, set the fps to 60, and hide that nasty cursor from covering my work haha
function setup() {
    createCanvas(1000, 1000);
    frameRate(60);
    colorMode(RGB, 255);
    noStroke();
    noCursor();

    // Create stars using random math based on canvas height / width. 
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
      brightness: random(100, 255),
      twinkleSpeed: random(0.01, 0.05), //adds a lil twinkle, so the brightness will change slightly for fun
      twinkleOffset: random(TWO_PI), 
    });
  }
}

function draw() {
    background(0); // Black background

    // Draw twinkling stars, just wanted to spruce up the whole thing, I had an hour extra before this was due and made the dumb decision to do this for whatever reason.
    for (let star of stars) {
        let twinkle = map(sin(frameCount * star.twinkleSpeed + star.twinkleOffset), -1, 1, 0.7, 1);
        fill(255, 255, 255, star.brightness * twinkle);
        ellipse(star.x, star.y, star.size, star.size);
    }


     // Draw the Sun with a gradient (I learnt specifically how to draw a gradient on a shape just for this)
    let sunSize = 100;
    let sunCenterX = width / 2; //lazilly centers the sun
    let sunCenterY = height / 2;
    for (let r = sunSize; r > 0; r--) {
        let brightness = map(r, 0, sunSize, 255, 150); // Adjust brightness for gradient
    fill(255, brightness, 0);
    ellipse(sunCenterX, sunCenterY, r, r);
    }

    // Planet distances and sizes
    let distances = [150, 250, 350]; // set distances of each planet, from the sun.
    let sizes = [20, 40, 60]; // set sizes for each planet

    // Planet speeds
    let speeds = [0.03, 0.01, 0.02]; //set the speeds of each planet

    // Planet colours, make em pretty, I wanted to be as efficient as possible for using let so much.
    let planetColours = [
        [171,181,74],    // Planet 1
        [231,125,17],    // planet 2
        [72,127,255]     // Planet 3
    ];

    // Draw planets and orbits
    for (let i = 0; i < distances.length; i++) {
        // Draw orbit track
        stroke(100); // Faint grey
        noFill();
        ellipse(width / 2, height / 2, distances[i] * 2, distances[i] * 2);
        noStroke();

        // Calculate planet position
        let x = width / 2 + cos(angles[i]) * distances[i];
        let y = height / 2 + sin(angles[i]) * distances[i];

        // Draw planets x 3
        fill(planetColours[i]); // Different colors for planets
        ellipse(x, y, sizes[i], sizes[i]);

        // Update planet angle
        angles[i] += speeds[i];

        // Draw a moon on planet 3
        if (i === 2) {
         // Calculate moon position
        let moonX = x + cos(moonAngle) * 50;
        let moonY = y + sin(moonAngle) * 50;

        // Draw moon
        fill(200);
        ellipse(moonX, moonY, 10, 10);
        // Update moons angle to go the opposite way and a unique speed
        moonAngle -= 0.025;
    }
  }
}