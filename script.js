

class Hero {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }
}

class Obstacle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }



Hero.prototype.move = moveHero;

const player = new Image();
player.src = "./images/player.png";
const ball = new Image();
ball.src = "./images/ball.gif";

function drawPlayer(u) {
  ctx.drawImage(player, u.x, u.y, 100, 50);
}
function drawSelf(u, obs) {
  if (obs) {
    ctx.drawImage(ball, u.x, u.y, 90, 120);
  } else {
    ctx.drawImage(player, u.x, u.y, 40, 60);
  }
}

let frames = 0;

function mainLoop() {
  frames++;
  setTimeout(theGame.writeScore(), 400);
  ctx.clearRect(0, 0, 400, 400);

  // this is where we draw the hero
  drawPlayer(theGame.theHero, false);
  //drawSelf(theGame.theHero, false);
  // then we draw all the obstacles
  theGame.obstacleArray.forEach(eachObstacle => {
    drawSelf(eachObstacle, true);
  });

  if (frames % 40 === 0) {
    theGame.spawnObstacle();
  }
  requestAnimationFrame(mainLoop);
}

function moveHero(futureX, futureY) {
  if (
    futureX + this.width <= 400 &&
    futureX >= 0 &&
    futureY + this.height <= 400 &&
    futureY >= 0
  ) {
    this.x = futureX;
    this.y = futureY;
  }
  if (futureX + this.width >= 380) {
    console.log("hey");
    this.x = futureX;
    this.x -= 50;
  }
}

let speed = 50;

document.onkeydown = function(e) {
  if (e.keyCode == 32) {
    theGame.theHero.move(theGame.theHero.x, 340);
  }
  if (e.key === "ArrowUp") {
    if (theGame.collisionDetect(theGame.theHero.x, theGame.theHero.y - speed)) {
      theGame.theHero.move(theGame.theHero.x, theGame.theHero.y - speed);
    }
  }
  if (e.key === "ArrowDown") {
    if (theGame.collisionDetect(theGame.theHero.x, theGame.theHero.y + speed)) {
      theGame.theHero.move(theGame.theHero.x, theGame.theHero.y + speed);
    }
  }
  if (e.key === "ArrowLeft") {
    if (theGame.collisionDetect(theGame.theHero.x - speed, theGame.theHero.y)) {
      theGame.theHero.move(theGame.theHero.x - speed, theGame.theHero.y);
    }
  }
  if (e.key === "ArrowRight") {
    if (theGame.collisionDetect(theGame.theHero.x + speed, theGame.theHero.y)) {
      theGame.theHero.move(theGame.theHero.x + speed, theGame.theHero.y);
    }
  }
};

const ctx = document.getElementById("example").getContext("2d");
document.getElementById("start").onclick = startGame;

let theGame;

function startGame() {
  theGame = new Game();
  mainLoop();
}