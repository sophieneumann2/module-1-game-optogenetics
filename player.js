/*const playerImage = new Image();
playerImage.src = '/images/player.png';*/

const playerImage1 = new Image();
playerImage1.src = '/images/player.png';
const playerImage2 = new Image();
playerImage2.src = '/images/player2.png';
const playerImages = [playerImage1, playerImage2];

class Player {
  constructor(game, speed, gravity, playerIndex) {
    this.game = game;
    this.width = 90;
    this.height = 90;
    this.x = (this.game.canvas.width - this.width) / 3;
    this.y = this.game.canvas.height * 0.8 - this.height;
    this.jumpingStartSpeed = speed;
    this.speedY = 0;
    this.GRAVITY = gravity;
    this.enableJumping = true;
    this.doJump = false;
    this.numberOfPlayer = playerIndex;
  }

  paint() {
    const context = this.game.context;
    context.drawImage(
      playerImages[this.numberOfPlayer - 1],
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  checkTargetIntersection() {
    let letter = 0;
    for (let target of this.game.targets) {
      if (
        this.x + this.width >= target.x &&
        this.x <= target.x + target.width &&
        this.y <= target.y + target.height &&
        this.y + this.height >= target.y
      ) {
        this.game.collectedTargets.push(target.letter);
        this.game.targets.splice(letter, 1);
      }
      letter++;
    }
  }

  /*checkIfGoingDown() {
    if (this.doJump && this.speed >= 0) {
      this.movingDown = true;
    } else {
      this.movingDown = false;
    }
  }*/

  /*movePlayerHorizontally() {
    if (this.x + this.width > this.game.enemy.x) {
      this.speedX = 0;
      this.accelerationX = 0;
    } else {
    this.speedX += this.accelerationX;
    const resistance = 0.05;

    if (this.speedX > 0) {
      this.speedX -= resistance;
    } else if (this.speedX < 0) {
      this.speedX += resistance;
    }
    //}

    this.x += this.speedX;
  }*/

  jump() {
    const floorLevel = this.game.canvas.height * 0.8 - this.height;
    if (this.doJump && this.enableJumping) {
      this.speedY = this.jumpingStartSpeed;
      this.enableJumping = false;
    }

    this.checkTargetIntersection();
    //this.checkIfGoingDown();

    /*this.speed += (this.GRAVITY / 1000) * 16;
    this.y += this.speed;

    if (this.movingDown) {
      for (let target of this.game.displayedTargets) {
        if (
          this.x >= target.x &&
          this.x <= target.x + target.width &&
          this.y + this.height >= target.y + target.height
        ) {
          this.speed = 0;
          this.y = target.y;
        }
      }
    }*/

    this.speedY += (this.GRAVITY / 1000) * 16;
    this.y += this.speedY;

    if (this.y > floorLevel) {
      this.speedY = 0;
      this.y = floorLevel;
      this.doJump = false;
      this.enableJumping = true;
      this.game.lastJump = Date.now();
    }
  }
}
