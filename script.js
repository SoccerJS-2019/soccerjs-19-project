const ctx = document.getElementById("example").getContext("2d");
let obstacleArray = [];
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
    this.direction = Math.floor(2 * Math.random() - 1);
  }
  moveDownForever() {
    setInterval(() => {
      this.y += 2 * Math.random() + 1.5;
      this.x += Math.random() * 10 * this.direction; //
      if (this.x >= 340) {
        this.direction = -1;
      }
      if (this.x <= -10) {
        this.direction = 1;
      }
      theGame.collisionDetect(theGame.theHero.x, theGame.theHero.y);
    }, 8);
  }
}

//Hero.prototype.move = moveHero;

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
  setTimeout(theGame.writeScore(), theGame.clearUnusedObstacles(), 400);
  ctx.clearRect(0, 0, 400, 400);

  // this is where we draw the hero
  drawPlayer(theGame.theHero);
  // then we draw all the obstacles
  obstacleArray.forEach(eachObstacle => {
    drawSelf(eachObstacle, true);
  });

  if (frames % 35 === 0) {
    theGame.spawnObstacle();
  }
  requestAnimationFrame(mainLoop);
}

let speed = 50;

document.onkeydown = function(e) {
  if (e.keyCode == 32) {
    theGame.moveHero(theGame.theHero.x, 340);
  }
  if (e.key === "ArrowUp") {
    theGame.collisionDetect(theGame.theHero.x, theGame.theHero.y - speed);
    theGame.moveHero(theGame.theHero.x, theGame.theHero.y - speed);
  }
  if (e.key === "ArrowDown") {
    theGame.collisionDetect(theGame.theHero.x, theGame.theHero.y + speed);
    theGame.moveHero(theGame.theHero.x, theGame.theHero.y + speed);
  }
  if (e.key === "ArrowLeft") {
    theGame.collisionDetect(theGame.theHero.x - speed, theGame.theHero.y);
    theGame.moveHero(theGame.theHero.x - speed, theGame.theHero.y);
  }
  if (e.key === "ArrowRight") {
    theGame.collisionDetect(theGame.theHero.x + speed, theGame.theHero.y);
    theGame.moveHero(theGame.theHero.x + speed, theGame.theHero.y);
  }
};

document.getElementById("start").onclick = startGame;

let theGame;

function startGame() {
  theGame = new Game();
  mainLoop();
}
