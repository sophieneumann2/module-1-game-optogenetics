const backgroundImageDemo = new Image();
backgroundImageDemo.src = '/images/background/sky.png';
const cloudsImage1Demo = new Image();
cloudsImage1Demo.src = '/images/background/clouds_1.png';
const cloudsImage2Demo = new Image();
cloudsImage2Demo.src = '/images/background/clouds_2.png';
const groundImageDemo = new Image();
groundImageDemo.src = '/images/background/ground.png';
const rocksImageDemo = new Image();
rocksImageDemo.src = '/images/background/rocks.png';
const backgroundLayersDemo = [
  backgroundImageDemo,
  cloudsImage1Demo,
  cloudsImage2Demo,
  groundImageDemo,
  rocksImageDemo
];

class DemoExt extends RawGame {
  constructor(canvas, screens, game) {
    super(canvas, game);
    this.targetWord = 'HELLO';
    this.textToDisplay =
      'Oh no, looks like this little neuron lost the ability to jump 😢';
  }

  paintBackground() {
    for (let layer of backgroundLayersDemo) {
      this.context.drawImage(layer, 0, 0, this.canvasWidth, this.canvasHeight);
    }

    let gradient = this.context.createLinearGradient(
      this.canvasWidth * 0.5,
      this.canvasHeight * 0.8,
      this.canvasWidth * 0.5,
      this.canvasHeight
    );
    gradient.addColorStop(0, 'rgb(0, 51, 102)');
    gradient.addColorStop(1, 'rgb(25, 0, 51)');
    this.context.fillStyle = gradient;

    this.context.fillRect(
      0,
      this.canvasHeight * 0.8,
      this.canvasWidth,
      this.canvasHeight * 0.2
    );
  }

  addDemoPlayer() {
    this.demoPlayer = new DemoPlayer(this, -35, 90);
  }

  addTarget(letter) {
    const newTarget = new Target(this, letter);
    newTarget.x = 100 + this.numberOfDisplayedTargets * (newTarget.width + 100);
    newTarget.y = this.canvas.height * 0.15;
    newTarget.speed = 0;
    this.targets.push(newTarget);
    this.numberOfDisplayedTargets++;
  }

  paintPlayer() {
    this.demoPlayer.paintDemoPlayer();
  }

  paint() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.paintBackground();
    this.paintPlayer();
    this.paintTarget();
    if (this.demoPlayer.x + this.demoPlayer.width >= 780) {
      this.context.fillStyle = 'rgba(255, 255, 255, 0.8)';

      this.context.beginPath();
      this.context.moveTo(68, 250);
      this.context.arcTo(880, 250, 880, 330, 8);
      this.context.arcTo(880, 330, 60, 330, 8);
      this.context.arcTo(60, 330, 60, 250, 8);
      this.context.arcTo(60, 250, 880, 250, 8);
      this.context.closePath();
      this.context.fill();

      this.context.fillStyle = 'black';
      this.context.font = '30px sans-serif';
      this.context.fillText(this.textToDisplay, 80, 300);
      setTimeout(() => {
        this.game.displayScreen('configureProperties');
        this.running = false;
      }, 3000);
    }
  }

  runLogic() {
    if (this.numberOfDisplayedTargets < this.targetWord.length) {
      this.addTarget(this.targetWord[this.numberOfDisplayedTargets]);
    }

    this.demoPlayer.checkIfDemoPlayerShouldJump();
    this.demoPlayer.jumpDemoPlayer();
  }

  start() {
    this.numberOfDisplayedTargets = 0;
    this.running = true;
    this.addDemoPlayer();
    this.loop();
  }
}
