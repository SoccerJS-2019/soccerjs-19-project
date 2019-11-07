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
    console.log("test");
    let x = setInterval(() => {
      let increment = 2;

      this.y = this.y + increment;
      let possibleX =
        this.x +
        this.directionX *
          Math.random() *
          Math.pow(Math.random() * increment, Math.random() * increment);

      if (possibleX >= 340 && this.y < 400 && this.y >= 300) {
        this.x = 340;
        increment *= 2;
      } else if (possibleX >= 340) {
        this.x = 340 * Math.random();
        increment *= 2;
      } else if (possibleX <= -10 && this.y < 400 && this.y >= 300) {
        this.x = 340;
        increment *= 2;
      } else if (possibleX <= -10) {
        this.x = 340 * Math.random();
        increment *= 2;
      } else {
        this.x = possibleX;
      }
      if (this.y > 400) {
        spawn = false;
        clearInterval(x);
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
    //spawn=true;
    let rX = 175;
    let rY = 0;
    let rWidth = 80;
    let rHeight = 60;
    let newObstacle = new Obstacle(rX, rY, rWidth, rHeight);
    this.numberOfBalls++;
    obstacleArray.push(newObstacle);

    newObstacle.moveDownForever();
  }

  moveHero(futureX, futureY) {
    if (
      futureX + this.theHero.width <= 380 &&
      futureX >= 0 &&
      futureY + this.theHero.height <= 400 &&
      futureY + 0.2 * this.theHero.height >= 300
    ) {
      this.theHero.x = futureX;
      this.theHero.y = futureY;
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
        this.score += 20;
        obstacleArray.splice(j, 1);
      }
    });
  }
}
