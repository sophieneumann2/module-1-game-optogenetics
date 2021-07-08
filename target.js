class Target {
  constructor(game, letter) {
    this.game = game;
    this.width = 90;
    this.height = 20;
    this.x = this.game.canvas.width - this.width * 2;
    this.y = this.game.canvas.height * 0.3;
    this.speed = 2;
    this.letter = letter;
    this.context = this.game.context;
    this.textHeight = 0;
  }

  paint() {
    this.paintPlatform();
    this.paintLetter();
  }

  paintLetter() {
    this.context.font = '110px Arial';
    this.context.fillStyle = 'black';
    const targetLetter = this.context.fillText(this.letter, this.x + 8, this.y);
    const textMeasures = this.context.measureText(targetLetter);
    this.textHeight =
      textMeasures.actualBoundingBoxAscent +
      textMeasures.actualBoundingBoxDescent;
  }

  paintPlatform() {
    this.context.fillStyle = 'yellow';
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }

  runLogic() {
    this.x -= this.speed;
  }
}
