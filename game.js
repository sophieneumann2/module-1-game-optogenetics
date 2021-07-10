/*const backgroundImage = new Image();
backgroundImage.src = '/images/background.jpg';
*/
class Game {
  constructor(canvas, screens) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.targetWord = '';
    this.targets = [];
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.backgroundShift = 0;
    this.lastTargetCreationTimestamp = Date.now();
    this.targetCreationInterval = 3000;

    this.running = false;
    this.screens = screens;
    this.enableControls();
  }
  paintBackground() {
    /*this.context.drawImage(
      backgroundImage,
      this.backgroundShift,
      200,
      500,
      200,
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

  displayScreen(name) {
    const screenThatShouldBeDisplayed = this.screens[name];
    const screensThatShouldBeHidden = Object.values(this.screens).filter(
      (screen) => screen !== screenThatShouldBeDisplayed
    );
    screenThatShouldBeDisplayed.style.display = '';
    for (const screen of screensThatShouldBeHidden) {
      screen.style.display = 'none';
    }
  }

  addPlayer(speed, gravity) {
    this.player = new Player(this, speed, gravity);
  }

  addEnemy(speed, gravity) {
    this.enemy = new Enemy(this, speed, gravity);
  }

  addTarget(letter) {
    const newTarget = new Target(this, letter);
    this.targets.push(newTarget);
    this.numberOfDisplayedTargets++;
  }

  checkWin() {
    this.context.font = '30px Arial';
    if (this.collectedTargets.join('') == this.targetWord) {
      this.screens['end'].querySelector('h3').innerText =
        'YOU WIN, LITTLE SUPERHERO! :)';
    } else {
      this.screens['end'].querySelector('h3').innerText = 'SORRY, YOU LOST :(';
    }
    this.running = false;
    console.log('Game stopped');
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
      'WHIMSICAL',
      'DANDELION',
      'MOUSTACHE',
      'SENSATION',
      'ARMSTRONG',
      'EVERGREEN',
      'FIREPLACE'
    ];
    this.targetWord =
      possibleTargetWords[
        Math.floor(Math.random() * possibleTargetWords.length)
      ];
    return;
  }

  clearTargets() {
    let letterIndex = 0;
    for (let target of this.targets) {
      if (target.x + target.width <= 0) {
        this.targets.splice(letterIndex, 1);
      }
      letterIndex++;
    }
  }

  paintPlayer() {
    this.player.paint();
  }

  paintEnemy() {
    this.enemy.paint();
  }

  paintTarget() {
    this.targets.forEach((target) => target.paint());
  }

  paint() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.paintBackground();
    this.paintPlayer();
    this.paintTarget();
    this.paintEnemy();
  }

  runLogic() {
    const currentTimestamp = Date.now();
    if (
      currentTimestamp - this.lastTargetCreationTimestamp >
      this.targetCreationInterval
    ) {
      if (this.numberOfDisplayedTargets < this.targetWord.length) {
        this.addTarget(this.targetWord[this.numberOfDisplayedTargets]);
        this.lastTargetCreationTimestamp = currentTimestamp;
      } else {
        if (!this.targets.length) {
          this.checkWin();
          this.displayScreen('end');
        }
      }
    }

    this.clearTargets();

    this.targets.forEach((target) => target.runLogic());
    this.player.jump();

    this.enemy.checkIfEnemyShouldJump();
    this.enemy.jump();
  }

  loop() {
    this.runLogic();
    this.paint();
    if (this.running) {
      window.requestAnimationFrame(() => {
        this.loop();
      });
    }
  }

  enableControls() {
    window.addEventListener('keydown', (event) => {
      if (event.code == 'Space') {
        if (this.player.enableJumping) {
          this.player.doJump = true;
        }
      }
    });
  }

  start(playerSpeed, playerGravity, enemySpeed, enemyGravity) {
    this.chooseTargetWord();
    this.numberOfDisplayedTargets = 0;
    this.collectedTargets = [];
    this.running = true;
    this.displayScreen('playing');
    this.addPlayer(playerSpeed, playerGravity);
    this.addEnemy(enemySpeed, enemyGravity);
    this.loop();
  }
}
