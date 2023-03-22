var bird;
var pipes = [];
var score = 0;
var highScore = 0;
var gameOver = false;

function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(135, 206, 235); // set the background color to sky blue
  if (!gameOver) {
    // update and draw the bird
    bird.update();
    bird.show();
    
    // update and draw the pipes
    for (var i = pipes.length-1; i >= 0; i--) {
      pipes[i].update();
      pipes[i].show();
      
      // check for collision with bird
      if (pipes[i].hits(bird)) {
        gameOver = true;
      }
      
      // remove pipes that have gone off screen
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
        score++;
      }
    }
    
    // add new pipe every 100 frames
    if (frameCount % 100 == 0) {
      pipes.push(new Pipe());
    }
    
    // display the score
    textSize(32);
    fill(255);
    text("Score: " + score, 10, 50);
    
    // update high score
    if (score > highScore) {
      highScore = score;
    }
  } else {
    // display game over screen and high score
    textSize(64);
    fill(255, 0, 0);
    text("Game Over", 50, height/2 - 50);
    textSize(32);
    fill(255);
    text("Score: " + score, 50, height/2 + 25);
    text("High Score: " + highScore, 50, height/2 + 75);
    text("Press Space to Restart", 50, height/2 + 125);
  }
}

function keyPressed() {
  if (key === ' ') {
    if (gameOver) {
      // reset the game
      bird = new Bird();
      pipes = [];
      pipes.push(new Pipe());
      score = 0;
      gameOver = false;
    } else {
      // flap the bird
      bird.up();
    }
  }
}

function Bird() {
  this.y = height/2;
  this.x = 50;
  this.gravity = 0.6;
  this.lift = -15;
  this.velocity = 0;
  
  this.show = function() {
    fill(255, 255, 0); // set the bird color to yellow
    ellipse(this.x, this.y, 32, 32);
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
  this.speed = 2;
  
  this.show = function() {
    fill(0, 200, 0); // set the pipe color to green
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height-this.bottom, this.w, this.bottom);
  }
  
  this.update = function() {
    this.x -= this.speed;
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
}

var bird;
var pipes = [];
var score = 0;
var highScore = 0;
var gameOver = false;

function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(135, 206, 235); // set the background color to sky blue
  if (!gameOver) {
    // update and draw the bird
    bird.update();
    bird.show();
    
    // update and draw the pipes
    for (var i = pipes.length-1; i >= 0; i--) {
      pipes[i].update();
      pipes[i].show();
      
      // check for collision with bird
      if (pipes[i].hits(bird)) {
        gameOver = true;
      }
      
      // remove pipes that have gone off screen
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
        score++;
      }
    }
    
    // add new pipe every 100 frames
    if (frameCount % 100 == 0) {
      pipes.push(new Pipe());
    }
    
    // display the score
    textSize(32);
    fill(255);
    text("Score: " + score, 10, 50);
    
    // update high score
    if (score > highScore) {
      highScore = score;
    }
  } else {
    // display game over screen and high score
    textSize(64);
    fill(255, 0, 0);
    text("Game Over", 50, height/2 - 50);
    textSize(32);
    fill(255);
    text("Score: " + score, 50, height/2 + 25);
    text("High Score: " + highScore, 50, height/2 + 75);
    text("Press Space to Restart", 50, height/2 + 125);
  }
}

function keyPressed() {
  if (key === ' ') {
    if (gameOver) {
      // reset the game
      bird = new Bird();
      pipes = [];
      pipes.push(new Pipe());
      score = 0;
      gameOver = false;
    } else {
      // flap the bird
      bird.up();
    }
  }
}

function Bird() {
  this.y = height/2;
  this.x = 50;
  this.gravity = 0.6;
  this.lift = -15;
  this.velocity = 0;
  
  this.show = function() {
    fill(255, 255, 0); // set the bird color to yellow
        ellipse(this.x, this.y, 32, 32);
  }
  
  this.up = function() {
    this.velocity += this.lift;
  }
  
  this.update = function() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    
    // prevent the bird from going off the top or bottom of the screen
    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}
