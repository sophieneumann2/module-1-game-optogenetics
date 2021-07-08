class Target {
  constructor(game) {
    this.game = game;
    this.width = 90;
    this.height = 20;
    this.x = this.game.canvas.width - this.width * 2;
    this.y = this.game.canvas.height * 0.3;
    this.speed = 2;
  }

  paint() {
    const context = this.game.context;
    context.fillStyle = 'yellow';
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  runLogic() {
    this.x -= this.speed;
  }
}
