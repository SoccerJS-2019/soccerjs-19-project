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
/////////////////////////////
class Obstacle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.directionX = 2 * Math.round(Math.random()) - 1;
    this.directionY = 1;
  }
  moveDownForever() {
    setInterval(() => {
      this.y += 0.7 * Math.random() * this.directionY;
      this.x += 0.7 * Math.random() * this.directionX;
      if (this.x >= 340) {
        this.directionX = -1;
      }
      if (this.x <= -10) {
        this.directionX = 1;
      }
      if (this.y > 340) {
        this.directionY = -1;
      }
      if (this.y < 0) {
        this.directionY = 1;
      }
      theGame.collisionDetect(theGame.theHero.x, theGame.theHero.y);
    }, 8);
  }
}
///////////////////////////////////////////////
class Game {
  constructor() {
    this.theHero = new Hero(150, 340, 50, 50);
    this.score = 0;
    this.numberOfBalls = 0;
  }
  writeScore() {
    this.score += 10;
    document.getElementById("score1").innerHTML = `${this.score}`;
  }
  spawnObstacle() {
    let rX = Math.floor(Math.random() * 325);
    let rY = Math.floor(Math.random() * 1);
    let rWidth = 80;
    let rHeight = 60;
    let newObstacle = new Obstacle(rX, rY, rWidth, rHeight);
    this.numberOfBalls++;
    obstacleArray.push(newObstacle);
    newObstacle.moveDownForever();
  }

  moveHero(futureX, futureY) {
    if (
      futureX + this.theHero.width <= 400 &&
      futureX >= 0 &&
      futureY + this.theHero.height <= 400 &&
      futureY >= 0
    ) {
      this.theHero.x = futureX;
      this.theHero.y = futureY;
    }
    if (futureX + this.theHero.width >= 380) {
      this.theHero.x = futureX;
      this.theHero.x -= 50;
    }
  }
  collisionDetect(futureX, futureY) {
    obstacleArray.forEach((obstacle, j) => {
      if (
        futureX + 20 + this.theHero.width >= obstacle.x &&
        futureX + 20 <= obstacle.x + obstacle.width &&
        futureY + this.theHero.height >= obstacle.y &&
        futureY <= obstacle.y + obstacle.height
      ) {
        return true;
      } else {
        return false;
      }
    });
  }
}
