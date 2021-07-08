class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.targets = [];
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

  addTarget() {
    const newTarget = new Target(this);
    this.targets.push(newTarget);
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
    setInterval(() => {
      this.addTarget();
    }, 3000);

    setInterval(() => {
      this.player.jump();
      this.targets.forEach((target) => target.runLogic());
      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.paint();
    }, 1000 / 60);
  }
}
