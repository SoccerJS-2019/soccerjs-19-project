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
      let increment = 10 * Math.random() * this.directionX;
      this.x += increment;
      this.y += increment ** 2;

      if (this.x >= 340) {
        this.directionX = -1;
      }
      if (this.x <= -10) {
        this.directionX = 1;
      }

      theGame.collisionDetect(theGame.theHero.x, theGame.theHero.y);
    }, 2);
  }
}
///////////////////////////////////////////////
class Game {
  constructor() {
    this.theHero = new Hero(150, 340, 50, 50);
    this.score = 0;
    this.numberOfBalls = 0;
    this.gameOver = false;
  }
  writeScore() {
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
      futureY + 0.2 * this.theHero.height >= 0
    ) {
      this.theHero.x = futureX;
      this.theHero.y = futureY;
    }
    if (futureX + this.theHero.width >= 380) {
      this.theHero.x = futureX;
      this.theHero.x -= 50;
    }
  }
  collisionDetect(x, y) {
    obstacleArray.forEach((obstacle, j) => {
      if (
        x + this.theHero.width >= obstacle.x &&
        x <= obstacle.x + obstacle.width &&
        y >= obstacle.y &&
        y <= obstacle.y + obstacle.height
      ) {
        this.gameOver = true;
      }
    });
  }
}
