// let h1=document.createElement('h1')
// h1.innerHTML="HI"
// let parent = document.getElementsByTagName('body')[0];
// parent.appendChild(h2Tag);
// h2Tag.innerHTML = "Elephant";

const ctx = document.getElementById("example").getContext("2d");
//////////////////////////////////////
const player = new Image();
player.src = "./images/player.png";
const redBall = new Image();
redBall.src = "./images/bb.png";
const ball = new Image();
ball.src = "./images/ball.gif";
const gameOver = new Image();
gameOver.src = "./images/gameover.jpg";
function drawPlayer(u) {
  ctx.drawImage(player, u.x, u.y, 100, 50);
}
function drawBall(u, obs) {
  if (obs) {
    ctx.drawImage(ball, u.x, u.y, 50, 50);
  } else {
    ctx.drawImage(player, u.x, u.y, 40, 60);
  }
}
let spawn = false;
/////////////////////////////
let frames = 0;
function mainLoop() {
  if (playGame) {
    frames++;
    //////////////////////////

    theGame.writeScore();
    theGame.collisionDetect(theGame.theHero.x, theGame.theHero.y);

    ctx.clearRect(0, 0, 400, 400);
    // this is where we draw the hero
    drawPlayer(theGame.theHero);

    if (!spawn) {
      ctx.drawImage(ball, 175, 0, 50, 50);
    }

    // then we draw all the obstacles
    obstacleArray.forEach(eachObstacle => {
      drawBall(eachObstacle, true);
    });

    if (theGame.numberOfBalls < 10) {
      if (frames % 300 === 0) {
        theGame.spawnObstacle();
        spawn = true;
      }
    }
  }

  requestAnimationFrame(mainLoop);
}

let speed = 25;
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
