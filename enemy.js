const enemyImage = new Image();
enemyImage.src = '/images/enemy.png';

class Enemy {
  constructor(game, speed, gravity) {
    this.game = game;
    this.width = 80;
    this.height = 80;
    this.x = ((this.game.canvas.width - this.width) / 3) * 2;
    this.y = this.game.canvas.height * 0.8 - this.height;
    this.jumpingStartSpeed = speed;
    this.speed = 0;
    this.GRAVITY = gravity;
    this.enableJumping = true;
    this.doJump = false;
    this.targetOfLastJump = new Target(this.game, '');
  }

  paint() {
    const context = this.game.context;
    context.drawImage(enemyImage, this.x, this.y, this.width, this.height);
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
        this.game.targets.splice(letter, 1);
      }
      letter++;
    }
  }

  checkIfEnemyShouldJump() {
    for (let target of this.game.targets) {
      if (this.x + this.width >= target.x && this.x < target.x + target.width) {
        if (this.targetOfLastJump != target && this.enableJumping) {
          this.doJump = true;
          this.targetOfLastJump = target;
        }
      }
    }
  }

  jump() {
    const floorLevel = this.game.canvas.height * 0.8 - this.height;
    if (this.doJump && this.enableJumping) {
      this.speed = this.jumpingStartSpeed;
      this.enableJumping = false;
    }

    this.checkTargetIntersection();

    this.speed += (this.GRAVITY / 1000) * 16;
    this.y += this.speed;

    if (this.y > floorLevel) {
      this.speed = 0;
      this.y = floorLevel;
      this.doJump = false;
      this.enableJumping = true;
    }
  }
}
