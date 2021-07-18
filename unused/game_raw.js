class RawGame {
  constructor(canvas, game) {
    this.game = game;
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.targets = [];
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.running = false;
    this.layerFrame = 0;
  }

  paintTarget() {
    this.targets.forEach((target) => target.paintLetter());
  }

  loop() {
    this.runLogic();
    this.paint();
    this.layerFrame++;
    if (this.running) {
      window.requestAnimationFrame(() => {
        this.loop();
      });
    }
  }
}
