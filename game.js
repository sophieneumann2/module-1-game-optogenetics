/*const backgroundImage = new Image();
backgroundImage.src = '/images/background.jpg';
*/
class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.targets = [];
    this.targetWord = '';
    this.enableControls();
    this.backgroundShift = 0;
    this.chooseTargetWord();
  }
  paintBackground() {
    /*this.context.drawImage(
      backgroundImage,
      this.backgroundShift,
      200,
      900,
      700,
      0,
      0,
      900,
      700
    );
    this.backgroundShift += 3;*/
    this.context.fillStyle = 'rgb(255, 134, 150)';
    this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.context.fillStyle = 'darkred';
    this.context.fillRect(
      0,
      this.canvasHeight * 0.8,
      this.canvasWidth,
      this.canvasHeight * 0.2
    );
  }

  addPlayer() {
    this.player = new Player(this);
  }

  addTarget(letter) {
    const newTarget = new Target(this, letter);
    this.targets.push(newTarget);
  }

  chooseTargetWord() {
    const possibleTargetWords = [
      'CHOCOLATE',
      'HAPPINESS',
      'ADVENTURE',
      'KNOWLEDGE',
      'PINEAPPLE',
      'WONDERFUL',
      'BREAKFAST',
      'WHIMSICAL'
    ];
    this.targetWord =
      possibleTargetWords[
        Math.floor(Math.random() * possibleTargetWords.length)
      ];
    return;
  }

  paintPlayer() {
    this.player.paint();
  }

  paintTarget() {
    this.targets.forEach((target) => target.paint());
  }

  paint() {
    this.paintBackground();
    this.paintPlayer();
  }

  runLogic() {
    if (this.targets.length < this.targetWord.length) {
      setInterval(() => {
        this.addTarget(this.targetWord[this.targets.length]);
      }, 3000);
    }

    setInterval(() => {
      this.targets.forEach((target) => target.runLogic());
      this.player.jump();
      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.paint();
      if (this.targets.length <= this.targetWord.length) {
        this.paintTarget();
      }
    }, 1000 / 60);
  }

  enableControls() {
    window.addEventListener('keydown', (event) => {
      if (event.code == 'Space') {
        console.log(
          '++++++++++++++++++++++++++++START OF JUUUUUUUUUUMP++++++++++++++++++++++++++++'
        );
        if (this.player.enableJumping) this.player.doJump = true;
      }
    });
  }
}
