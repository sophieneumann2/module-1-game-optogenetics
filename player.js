class Player {
  constructor(game) {
    this.game = game;
    this.width = 30;
    this.height = 30;
    this.x = (this.game.canvas.width - this.width) / 2;
    this.y = this.game.canvas.height * 0.8 - this.height;
    this.speed = 0;
    this.goUp = true;
  }

  runLogic() {
    // this.y++;
  }

  paint() {
    const context = this.game.context;
    //context.save();
    /*context.drawImage(
        playerImage,
        this.x - this.width / 2,
        this.y - this.height / 2,
        this.width,
        this.height
      );*/
    //context.restore();
    context.fillStyle = 'blue';
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  jump() {
    const GRAVITY = 0.2;
    const floorLevel = this.game.canvas.height * 0.8 - this.height;
    const jumpHeight = this.game.canvas.height * 0.25;

    if (this.goUp) {
      if (this.y <= jumpHeight) {
        this.speed *= -1;
        this.speed += GRAVITY;
        this.goUp = false;
      } else {
        this.speed += GRAVITY;
      }
    } else {
      if (this.y >= floorLevel) {
        this.speed = 0;
      } else {
        this.speed += GRAVITY * 0.9;
      }
    }
    this.y -= this.speed;
  }
}
