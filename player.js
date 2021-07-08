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
    this.GRAVITY = 10;
    this.enableJumping = true;
    this.doJump = false;
  }

  runLogic() {
    // this.y++;
  }

  paint() {
    const context = this.game.context;
    //context.save();
    context.drawImage(playerImage, this.x, this.y, this.width, this.height);
    //context.restore();
    /*context.fillStyle = 'blue';
    context.fillRect(this.x, this.y, this.width, this.height);*/
  }

  jump() {
    const floorLevel = this.game.canvas.height * 0.8 - this.height;

    /*if (!this.enableJumping) {
      this.speed = -10;
      this.enableJumping = true;
    }

    this.speed += (this.GRAVITY / 1000) * 16;
    this.y += this.speed;

    if (this.y > floorLevel) {
      this.speed = 0;
      this.y = floorLevel;
      return;
    }*/

    if (this.doJump && this.enableJumping) {
      this.speed = -10;
      this.enableJumping = false;
    }

    this.speed += (this.GRAVITY / 1000) * 16;
    this.y += this.speed;

    if (this.y > floorLevel) {
      this.speed = 0;
      this.y = floorLevel;
      this.doJump = false;
      this.enableJumping = true;
      return;
    }
  }
}
