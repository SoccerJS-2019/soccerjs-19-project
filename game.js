class Game {
  constructor() {
    this.theHero = new Hero(150, 340, 50, 50);
    //this.obstacleArray = [];
    this.score = 0;
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
    obstacleArray.push(newObstacle);
    newObstacle.moveDownForever();
  }
  clearUnusedObstacles() {
    obstacleArray.forEach((ob, i) => {
      if (ob.y > 420) {
        console.log("clearing the obstacle");
        obstacleArray.splice(i, 1);
        this.score -= 10;
      }
    });
  }
  moveHero(futureX, futureY) {
    //moveHero transferred from script to here
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
    //let canMove = true;

    obstacleArray.forEach((obs, j) => {
      if (
        futureX + 30 + this.theHero.width >= obs.x &&
        futureX + 30 <= obs.x + obs.width &&
        futureY + this.theHero.height >= obs.y &&
        futureY <= obs.y + obs.height
      ) {
        obstacleArray.splice(j, 1);
        theGame.score += 10;
      }
    });
  }
}
