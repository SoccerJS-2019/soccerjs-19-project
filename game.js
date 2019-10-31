let score1 = 0;
let score1T = document.getElementById("score1");
let score2 = 0;
let score2T = document.getElementById("score2");
class Game {
  constructor() {
    (this.theHero = new Hero(150, 340, 50, 50)), (this.obstacleArray = []);
  }
  spawnObstacle() {
    let rX = Math.floor(Math.random() * 420);
    let rY = Math.floor(Math.random() * 10);
    let rWidth = Math.floor(Math.random() * 100) + 70;
    let rHeight = Math.floor(Math.random() * 100) + 30;
    let newObstacle = new Obstacle(rX, rY, rWidth, rHeight);
    this.obstacleArray.push(newObstacle);
    newObstacle.moveDownForever();
  }

  clearUnusedObstacles() {
    this.obstacleArray.forEach((ob, i) => {
      if (ob.y > 400) {
        score2 += 10;
        score2T.innerHTML = `${score2}`;
        this.obstacleArray.splice(i, 1);
      }
    });
  }

  collisionDetect(futureX, futureY) {
    let canMove = true;

    this.obstacleArray.forEach(obs => {
      //   console.log(
      //     futureX,
      //     futureY,
      //     this.theHero.width,
      //     this.theHero.height,
      //     obs.x,
      //     obs.y,
      //     obs.width,
      //     obs.height
      //   );

      if (
        futureX + this.theHero.width >= obs.x &&
        futureX <= obs.x + obs.width &&
        futureY + this.theHero.height >= obs.y &&
        futureY <= obs.y + obs.height
      ) {
        obs.x = 0;
        obs.y = 0;
        canMove = true;
        score1 += 10;
        score1T.innerHTML = `${score1}`;
      }
    });

    return canMove;
  }
}
