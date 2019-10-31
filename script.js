const ctx = document.getElementById("example").getContext("2d");

class Hero {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }
}
Hero.prototype.move = moveHero;

const player = new Image();
player.src = "./images/player.png";
const ball = new Image();
ball.src = "./images/ball.gif";

function drawPlayer(u, obs) {
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

// function checkCollision() {
//   var rect1 = {
//     x: theGame.theHero.x,
//     y: theGame.theHero.y,
//     width: 50,
//     height: 50,
//   };
//   var rect2 = { x: , y: 10, width: 10, height: 10 };
//   console.log(theGame);
//   if (
//     rect1.x < rect2.x + rect2.width &&
//     rect1.x + rect1.width > rect2.x &&
//     rect1.y < rect2.y + rect2.height &&
//     rect1.y + rect1.height > rect2.y
//   ) {
//     console.log("collision");
//     // collision detected!
//     return true;
//   }
//   return false;
// }
function mainLoop() {
  frames++;

  ctx.clearRect(0, 0, 400, 400);

  // this is where we draw the hero
  drawPlayer(theGame.theHero, false);
  //drawSelf(theGame.theHero, false);
  // then we draw all the obstacles
  theGame.obstacleArray.forEach(eachObstacle => {
    drawSelf(eachObstacle, true);
  });
  theGame.obstacleArray.forEach(eachObstacle => {
    drawSelf(eachObstacle, true);
  });

  if (frames % 40 === 0) {
    theGame.spawnObstacle();
  }
  requestAnimationFrame(mainLoop);
  // setTimeout();
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
  //   if (futureX + Hero.theHero.width >= 400) {
  //     hero.x = futureX;

  //     setTimeout(() => {
  //       hero.x -= 30;
  //       hero.width = 35;
  //       hero.height = 35;
  //     }, 100);

  //     setTimeout(() => {
  //       hero.width = 20;
  //       hero.height = 20;
  //     }, 200);
  //   }
}

let speed = 50;

document.onkeydown = function(e) {
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

class Obstacle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  moveDownForever() {
    let setI = setInterval(() => {
      this.y += 1;
      // this.x += 10 * (Math.random() - 0.5);
      if (this.y > 420) {
        clearInterval(setI);
        score2 += 10;
        score2T.innerHTML = `${score2}`;
      }
    }, 5);
  }
}

document.getElementById("start").onclick = startGame;

let theGame;

function startGame() {
  theGame = new Game();
  mainLoop();
}
