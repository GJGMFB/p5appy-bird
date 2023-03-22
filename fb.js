var highScore = 0;
var score = 0;
var pipeSpeed = 2;
var bird;
var pipes = [];
var accel = 0.001;
var maxPipeSpeed = 7;
var minPipeGap = 160; // minimum vertical gap between pipes in pixels
var startScreen = true; // start in the start screen state
var gameOverScreen = false;

function setup() {
  createCanvas(500, 700);
  bird = new Bird();
}

function keyPressed() {
  if (keyCode === ENTER && startScreen) {
    startGame(); // start the game if the player presses enter on the start screen
  } else if (keyCode === 32 && !startScreen) {
    bird.up(); // make the bird flap its wings if the player presses space during the game
  } else if (keyCode === ENTER && gameOverScreen) {
    restartGame(); // restart the game if the player presses enter during the game
  }
}

function startGame() {
  startScreen = false; // switch to the play state
}

function restartGame() {
  score = 0; // reset the score
  pipes = []; // remove all pipes
  bird = new Bird(); // create a new bird
  gameOverScreen = false; // switch to the play state
  pipeSpeed = 2; // reset the speed of the pipes  
  accel = 0.001;
  maxPipeSpeed = 6;
}

function gameOver() {
  gameOverScreen = true; // switch to the game over screen state
  if (score > highScore) {
    highScore = score; // update the high score if necessary
  }
}

function draw() {
  // draw the game or the start screen depending on the game state
  if (startScreen) {
    // draw the start screen
    background(0);
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text("Press ENTER to start", width/2, height/2);
  } else if (gameOverScreen) {
    // draw the game over screen and high score
	background(135, 206, 235); // set the background color to sky blue
    textSize(64);
    fill(255, 0, 0);
    text("Game Over", 50, height/2 - 50);
    textSize(32);
    fill(255);
    text("Score: " + score, 50, height/2 + 25);
    text("High Score: " + highScore, 50, height/2 + 75);
    text("Press Enter to Restart", 50, height/2 + 125);	
  } else {
    // draw the game
    background(135, 206, 235); // set the background color to sky blue

    // draw and update the bird
    bird.show();
    bird.update();

    // draw and update the pipes
    for (var i = pipes.length-1; i >= 0; i--) {
      pipes[i].update();
      pipes[i].show();
      
      if (pipes[i].hits(bird)) {
        gameOver();
      }

      // remove pipes when they go off the left side of the screen
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
        score++;
      }
    }

    // add a new pipe every starting from 100 frames, counting down with the pipeSpeed
    if (frameCount % round(80 - (7 * pipeSpeed)) == 0) {
      pipes.push(new Pipe());
    }

    // display the score
    fill(255);
    textSize(32);
    textAlign(LEFT);
    text(score, 10, 50);

    // display the current speed
    fill(255);
    textSize(16);
    textAlign(LEFT);
    text("Speed: " + pipeSpeed.toFixed(2), 10, 20);

  }
}

function Bird() {
  this.y = height/2;
  this.x = 50;
  this.gravity = 0.7;
  this.lift = -15;
  this.velocity = 0;
  
  this.show = function() {
    fill(255, 255, 0); // set the bird color to yellow
    ellipse(this.x, this.y, 30, 30);
  }
  
  this.up = function() {
    this.velocity += this.lift;
  }
  
  this.update = function() {
    this.velocity += this.gravity;
    this.velocity *= 0.9; // add some damping to the bird's velocity
    this.y += this.velocity;
    
    // check for collision with top or bottom of screen
    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    } else if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}

function Pipe() {
  this.top = random(height/2);
  this.bottom = random(height/2);
  this.x = width;
  this.w = 20;
  this.speed = pipeSpeed;
  
  this.show = function() {
    fill(0, 200, 0); // set the pipe color to green
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height-this.bottom, this.w, this.bottom);
  }
  
  this.update = function() {
    this.x -= this.speed;
    
    if (this.speed + accel < maxPipeSpeed) {
      this.speed += accel; // increase the speed by acceleration amount on every frame
      pipeSpeed = this.speed; // update global speed var
    }
  }
  
  this.offscreen = function() {
    return (this.x < -this.w);
  }
  
  this.hits = function(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        return true;
      }
    }
    return false;
  }
  
  // check if the gap is less than the minimum and adjust the positions of the pipes accordingly
  if (minPipeGap) {
    while (this.bottom + this.top < minPipeGap) {
      this.top = random(height/2);
      this.bottom = random(height/2);
    }
  }
}
