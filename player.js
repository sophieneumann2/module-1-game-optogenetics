const playerImage = new Image();
playerImage.src = '/images/player.png';

class Player {
  constructor(game) {
    this.game = game;
    this.width = 90;
    this.height = 90;
    this.x = (this.game.canvas.width - this.width) / 2;
    this.y = this.game.canvas.height * 0.8 - this.height;
    this.speed = 0;
    this.GRAVITY = 90;
    this.enableJumping = true;
    this.doJump = false;
  }

  paint() {
    const context = this.game.context;
    context.drawImage(playerImage, this.x, this.y, this.width, this.height);
  }

  /*checkPlatformIntersection() {
    let letter = 0;
    for (let target of this.game.targets) {
      letter++;
      if (
        this.y + this.height >= target.y &&
        this.speed >= 0 &&
        this.x + this.width >= target.x &&
        this.x <= target.x + target.width
      ) {
        this.y = this.y;
        return true;
      }
      if (letter == this.game.targets.length) return false;
    }
  }*/

  checkTargetIntersection() {
    let letter = 0;
    for (let target of this.game.targets) {
      letter++;
      if (
        this.x + this.width >= target.x &&
        this.x <= target.x + target.width &&
        this.y <= target.y + target.height &&
        this.y + this.height >= target.y
      ) {
        this.game.collectedTargets.push(target.letter);
        this.game.targets.splice(letter - 1, 1);
      }
    }
  }

  jump() {
    const floorLevel = this.game.canvas.height * 0.8 - this.height;
    if (this.doJump && this.enableJumping) {
      this.speed = -35;
      this.enableJumping = false;
    }

    this.checkTargetIntersection();

    //if (!this.checkPlatformIntersection()) {
    this.speed += (this.GRAVITY / 1000) * 16;
    this.y += this.speed;
    //}

    if (this.y > floorLevel) {
      this.speed = 0;
      this.y = floorLevel;
      this.doJump = false;
      this.enableJumping = true;
      return;
    }
  }
}
