// let h1=document.createElement('h1')
// h1.innerHTML="HI"
// let parent = document.getElementsByTagName('body')[0];
// parent.appendChild(h2Tag);
// h2Tag.innerHTML = "Elephant";

const ctx = document.getElementById("example").getContext("2d");
//////////////////////////////////////
const player = new Image();
player.src = "./images/ball.gif";
const redBall = new Image();
redBall.src = "./images/cone.png";
const ball = new Image();
ball.src = "./images/ball.gif";
const gameOver = new Image();
gameOver.src = "./images/gameover.jpg";
function drawPlayer(u) {
  ctx.drawImage(player, u.x, u.y, 70, 200);
}
function drawBall(u, obs) {
  if (obs) {
    ctx.drawImage(redBall, u.x, u.y, 30, 50);
  } else {
    ctx.drawImage(player, u.x, u.y, 40, 60);
  }
}

/////////////////////////////
let frames = 0;
function mainLoop() {
  frames++;
  //   if (theGame.score <= -300) {
  //     ctx.drawImage(gameOver, 0, 0, 200, 200);
  //     return;
  //   }
  setTimeout(
    theGame.writeScore(),
    theGame.collisionDetect(theGame.theHero.x, theGame.theHero.y),
    400
  );
  if (theGame.gameOver) {
    ctx.drawImage(gameOver, 0, 0, 200, 200);
    return;
  }
  ctx.clearRect(0, 0, 400, 400);
  // this is where we draw the hero
  drawPlayer(theGame.theHero);
  // then we draw all the obstacles
  obstacleArray.forEach(eachObstacle => {
    drawBall(eachObstacle, true);
  });

  if (theGame.numberOfBalls < 4) {
    if (frames % 300 === 0) {
      theGame.spawnObstacle();
    }
  }

  requestAnimationFrame(mainLoop);
}
let speed = 20;
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
