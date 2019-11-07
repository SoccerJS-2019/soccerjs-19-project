let obstacleArray = [];
let redArray = [];
class Hero {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }
}
///////////////////////////////////////////
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
    }, 6);
  }
}
////////////////////////////Hero.prototype.move = moveHero;
class RedBall {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.direction = 2 * Math.random() - 1;
  }
  moveDownForever() {
    setInterval(() => {
      this.y += 2 * Math.random();
      this.x += Math.random() * 2 * this.direction; //
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

class Game {
  constructor() {
    this.theHero = new Hero(150, 340, 50, 50);
    this.score = 0;
  }
  writeScore() {
    document.getElementById("score1").innerHTML = `${this.score}`;
  }
  spawnObstacle() {
    let rX = Math.random() * 325;
    let rY = 0;
    let rWidth = 80;
    let rHeight = 60;
    let newObstacle = new Obstacle(rX, rY, rWidth, rHeight);
    obstacleArray.push(newObstacle);
    newObstacle.moveDownForever();
  }
  /////////////
  spawnRed() {
    let rX = Math.floor(Math.random() * 325);
    let rY = Math.floor(Math.random() * 1);
    let rWidth = 80;
    let rHeight = 60;
    let newRedBall = new RedBall(rX, rY, rWidth, rHeight);
    redArray.push(newRedBall);
    newRedBall.moveDownForever();
  }
  ///////////////
  clearUnusedObstacles() {
    redArray.forEach((redBall, i) => {
      if (redBall.y > 380) {
        redArray.splice(i, 1);
      }
    });
    ////////////
    obstacleArray.forEach((ob, i) => {
      if (ob.y > 380) {
        console.log("clearing the obstacle");
        obstacleArray.splice(i, 1);
        this.score -= 20;
        document.querySelector("#example").classList.add("shaking");
        setTimeout(() => {
          document.querySelector("#example").classList.remove("shaking");
        }, 400);
      }
    });
  }
  moveHero(futureX, futureY) {
    if (
      futureX + this.theHero.width <= 380 &&
      futureX >= 0 &&
      futureY + this.theHero.height <= 400 &&
      futureY >= 0
    ) {
      this.theHero.x = futureX;
      this.theHero.y = futureY;
    }
  }
  collisionDetect(futureX, futureY) {
    redArray.forEach((redBall, j) => {
      if (
        futureX + 20 + this.theHero.width >= redBall.x &&
        futureX + 20 <= redBall.x + redBall.width &&
        futureY + this.theHero.height >= redBall.y &&
        futureY <= redBall.y + redBall.height
      ) {
        redArray.splice(j, 1);
        theGame.score -= 300;
      } else if (redBall.y >= 380) {
        document.querySelector("#example").classList.add("shaking");
        setTimeout(() => {
          document.querySelector("#example").classList.remove("shaking");
        }, 300);
      }
    });
    obstacleArray.forEach((obs, j) => {
      if (
        futureX + 30 + this.theHero.width >= obs.x &&
        futureX + 30 <= obs.x + obs.width &&
        futureY + this.theHero.height >= obs.y &&
        futureY <= obs.y + obs.height
      ) {
        obstacleArray.splice(j, 1);
        theGame.score += 10;
        document.querySelector("#score").classList.add("shaking");
        setTimeout(() => {
          document.querySelector("#score").classList.remove("shaking");
        }, 400);
      }
    });
  }
}
