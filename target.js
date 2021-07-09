const letterImage = new Image();
letterImage.src = '/images/alphabet_rotating.png';

class Target {
  constructor(game, letter) {
    this.game = game;
    this.width = 74;
    this.height = 74;
    this.x = this.game.canvas.width - this.width * 2;
    this.y = this.game.canvas.height * 0.2;
    this.speed = 2;
    this.letter = letter;
    this.context = this.game.context;
    this.frame = 0;
  }

  paint() {
    //this.paintPlatform();
    this.paintLetter();
  }

  paintLetter() {
    /*this.context.fillStyle = 'navy';
    this.context.fillRect(this.x, this.y, this.width, this.height);
    this.context.font = '110px Arial';
    this.context.fillStyle = 'black';
    const targetLetter = this.context.fillText(this.letter, this.x, this.y);
    const textMeasures = this.context.measureText(targetLetter);
    this.textHeight =
      textMeasures.actualBoundingBoxAscent +
      textMeasures.actualBoundingBoxDescent;*/

    const indexOfLetter = this.game.alphabet.indexOf(this.letter);

    this.context.drawImage(
      letterImage,
      this.width * Math.round(this.frame / 10),
      this.height * indexOfLetter,
      this.width,
      this.height,
      this.x,
      this.y,
      this.height,
      this.width
    );
    this.frame++;
    this.frame %= 70;
  }

  /*paintPlatform() {
    this.context.fillStyle = 'yellow';
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }*/

  runLogic() {
    this.x -= this.speed;
  }
}
