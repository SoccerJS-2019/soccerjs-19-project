let score1T = document.getElementById("score1");
class Game {
  constructor() {
    this.theHero = new Hero(150, 340, 50, 50);
    this.obstacleArray = [];
    this.score = 0;
  }
  writeScore() {
    document.getElementById("score1").innerHTML = `${this.score}`;
  }
  spawnObstacle() {
    let rX = Math.floor(Math.random() * 360);
    let rY = Math.floor(Math.random() * 1);
    let rWidth = 80;
    let rHeight = 60;
    let newObstacle = new Obstacle(rX, rY, rWidth, rHeight);
    this.obstacleArray.push(newObstacle);
    console.log(this.obstacleArray);
    newObstacle.moveDownForever();
    this.clearUnusedObstacles();
  }

  clearUnusedObstacles() {
    this.obstacleArray.forEach((ob, i) => {
      if (ob.y > 420) {
        console.log("clearing the obstacle");
        this.obstacleArray.splice(i, 1);
        this.score -= 10;
        this.writeScore();
      }
    });
  }

  collisionDetect(futureX, futureY) {
    let canMove = true;

    this.obstacleArray.forEach((obs, j) => {
      if (
        futureX + 30 + this.theHero.width >= obs.x &&
        futureX + 30 <= obs.x + obs.width &&
        futureY + this.theHero.height >= obs.y &&
        futureY <= obs.y + obs.height
      ) {
        this.obstacleArray.splice(j, 1);
        theGame.score += 10;
        writeScore();
      }
    });

    return canMove;
  }
  
}
