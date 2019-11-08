const ctx = document.getElementById("example").getContext("2d");
//////////////////////////////////////
const player = new Image();
player.src = "./images/player.png";
const redBall = new Image();
redBall.src = "./images/redball.png";
const ball = new Image();
ball.src = "./images/ball.gif";
const gameOver = new Image();
gameOver.src = "./images/gameover.jpg";
function drawPlayer(u) {
  ctx.drawImage(player, u.x, u.y, 100, 50);
}
function drawBall(u, obs) {
  if (obs) {
    ctx.drawImage(ball, u.x, u.y, 90, 120);
  } else {
    ctx.drawImage(player, u.x, u.y, 40, 60);
  }
}
/////////////////////////////
function drawRedBall(u, obs) {
  if (obs) {
    ctx.drawImage(redBall, u.x, u.y, 80, 50);
  } else {
    ctx.drawImage(player, u.x, u.y, 40, 60);
  }
}
////////////////////////////////
let frames = 0;
function mainLoop() {
  if (playGame) {
    frames++;

    if (theGame.score <= -200) {
      document.getElementById("score1").innerHTML = `<h3>GAME OVER</h3>`;
      parent.appendChild(h1Tag);
      return;
    }
    if (theGame.score >= 250) {
      document.getElementById("score1").innerHTML = `<h3>YOU WON</h3>`;
      parent.appendChild(h1Tag);
      return;
    }

    theGame.writeScore();
    theGame.clearUnusedObstacles();

    ctx.clearRect(0, 0, 400, 400);
    // this is where we draw the hero
    drawPlayer(theGame.theHero);
    // then we draw all the obstacles
    obstacleArray.forEach(eachObstacle => {
      drawBall(eachObstacle, true);
    });
    /////////////
    redArray.forEach(redBall => {
      drawRedBall(redBall, true);
    });
    ////////////////////
    if (frames % 40 === 0) {
      theGame.spawnObstacle();
    }
    if (frames % 450 === 0) {
      theGame.spawnRed();
    }
  }

  requestAnimationFrame(mainLoop);
}

let speed = 50;

document.onkeydown = function(e) {
  if (e.keyCode === 32) {
    playGame = !playGame;
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

const start = document.querySelector(".start");
start.onclick = startGame;
let theGame;
let playGame = false;
function startGame() {
  playGame = !playGame;
  if (!theGame) {
    theGame = new Game();
    mainLoop();
  }
  start.innerHTML === "PLAY"
    ? (start.innerHTML = "PAUSE")
    : (start.innerHTML = "PLAY");
}
