const letterImage = new Image();
letterImage.src = '/images/alphabet_rotating.png';

class Target {
  constructor(game, letter) {
    this.game = game;
    this.width = 74;
    this.height = 74;
    this.x = this.game.canvas.width;
    this.y = this.game.canvas.height * (0.15 + Math.random() * 0.25);
    this.speed = 3.5;
    this.letter = letter;
    this.context = this.game.context;
    this.frame = 0;
    this.platformHeight = 20;
  }

  paint() {
    this.paintLetter();
  }

  paintPlatform() {
    this.context.fillStyle = 'white';
    this.context.fillRect(
      this.x,
      this.y + this.height,
      this.width,
      this.platformHeight
    );
  }

  paintLetter() {
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

  runLogic() {
    this.x -= this.speed;
  }
}
