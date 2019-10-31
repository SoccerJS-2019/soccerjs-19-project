let score1 = 0;
let score1T = document.getElementById("score1");
let score2 = 0;
let score2T = document.getElementById("score2");
class Game {
  constructor() {
    (this.theHero = new Hero(150, 340, 50, 50)), (this.obstacleArray = []);
  }
  spawnObstacle() {
    let rX = Math.floor(Math.random() * 360);
    let rY = Math.floor(Math.random() * 1);
    let rWidth = 80;
    let rHeight = 60;
    let newObstacle = new Obstacle(rX, rY, rWidth, rHeight);
    this.obstacleArray.push(newObstacle);
    newObstacle.moveDownForever();
  }

  clearUnusedObstacles() {
    this.obstacleArray.forEach((ob, i) => {
      if (ob.y > 420) {
        score2 += 10;
        score2T.innerHTML = `${score2}`;
        this.obstacleArray.splice(i, 1);
      }
    });
  }

  collisionDetect(futureX, futureY) {
    let canMove = true;

    this.obstacleArray.forEach(obs => {
      if (
        futureX + this.theHero.width >= obs.x &&
        futureX <= obs.x + obs.width &&
        futureY + this.theHero.height >= obs.y &&
        futureY <= obs.y + obs.height
      ) {
        obs.x = 10000;
        obs.y = 10000;
        canMove = true;
        score1 += 10;
        score1T.innerHTML = `${score1}`;
      }
    });

    return canMove;
  }
}
