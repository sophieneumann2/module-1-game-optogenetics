class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.targets = [];
    this.targetWord = 'CHOCOLATE';
    this.enableControls();
    //this.chooseTargetWord();
  }
  paintBackground() {
    this.context.fillStyle = 'rgb(255, 134, 150)';
    this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  paintGround() {
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

  moveTarget() {
    this.targets[0].runLogic();
  }

  paint() {
    this.paintBackground();
    this.paintPlayer();
    this.paintGround();
    this.paintTarget();
  }

  runLogic() {
    while (this.targets.length < this.targetWord.length) {
      setInterval(() => {
        this.addTarget(this.targetWord[this.targets.length]);
      }, 3000);
    }

    setInterval(() => {
      this.targets.forEach((target) => target.runLogic());
      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.paint();
    }, 1000 / 60);
  }

  movePlayer() {
    this.player.enableJumping = false;
    setInterval(() => {
      this.player.jump();
      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.paint();
    }, 1000 / 60);
    return;
  }

  enableControls() {
    window.addEventListener('keydown', (event) => {
      if (event.code == 'Space') {
        console.log(
          '++++++++++++++++++++++++++++START OF JUUUUUUUUUUMP++++++++++++++++++++++++++++'
        );
        if (this.player.enableJumping) this.movePlayer();
      }
    });
  }
}
