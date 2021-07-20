const backgroundImage = new Image();
//backgroundImage.src = '/images/background.png';
backgroundImage.src = '/images/background/sky.png';
const cloudsImage1 = new Image();
cloudsImage1.src = '/images/background/clouds_1.png';
const cloudsImage2 = new Image();
cloudsImage2.src = '/images/background/clouds_2.png';
const groundImage = new Image();
groundImage.src = '/images/background/ground.png';
const rocksImage = new Image();
rocksImage.src = '/images/background/rocks.png';
const backgroundLayers = [
  backgroundImage,
  cloudsImage1,
  cloudsImage2,
  rocksImage
];

const backgroundShifts = [0, 0.5, 1, 1.5];

class Game {
  constructor(canvas, screens) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.targetWord = '';
    //this.targetWord = [];
    this.targets = [];
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.lastTargetCreationTimestamp = Date.now();
    this.targetCreationInterval = 3000;
    this.running = false;
    this.screens = screens;
    this.layerFrame = 0;
    this.players = [];
    this.enableControls();
    this.xPositionOfPlayers = [
      (this.canvasWidth - 90) / 3,
      (this.canvasWidth - 90) / 2
    ];
    this.currentLevel = 1;
  }
  paintBackground() {
    let layerIndex = 0;
    for (let layer of backgroundLayers) {
      for (let iFrameDrawing = 0; iFrameDrawing < 4; iFrameDrawing++) {
        this.context.drawImage(
          layer,
          this.canvasWidth * iFrameDrawing -
            this.layerFrame * backgroundShifts[layerIndex] -
            iFrameDrawing,
          0,
          this.canvasWidth,
          this.canvasHeight
        );
      }
      layerIndex++;
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

    this.context.fillStyle = 'white';
    this.context.font = '30px sans-serif';
    this.context.fillText('PRESS SPACE TO JUMP', 280, 650);
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

  addPlayer(speed, gravity, playerIndex) {
    //this.player = new Player(this, speed, gravity);
    let newPlayer = new Player(this, speed, gravity, playerIndex);
    newPlayer.x = this.xPositionOfPlayers[this.players.length]; // only for 2 players recently

    this.players.push(newPlayer);
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

    this.screens['end'].querySelector(
      '.expected-target-word'
    ).innerText = `The expected target word was ${this.targetWord}`;
    this.screens['end'].querySelector(
      '.collected-target-word'
    ).innerText = `You collected ${this.collectedTargets.join('')}`;

    if (this.collectedTargets.join('') == this.targetWord) {
      this.screens['end'].querySelector('h3').innerText =
        'YOU WIN, LITTLE SUPERHERO! :)';
      if (nextLevelButton.classList.contains('disabled')) {
        nextLevelButton.classList.remove('disabled');
      }
      if (this.currentLevel == 2) {
        nextLevelButton.classList.add('disabled');
      }
    } else {
      this.screens['end'].querySelector('h3').innerText = 'SORRY, YOU LOST :(';
      nextLevelButton.classList.add('disabled');
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
    let newTargetWord =
      possibleTargetWords[
        Math.floor(Math.random() * possibleTargetWords.length)
      ];
    //this.targetWord.push(newTargetWord);
    this.targetWord = newTargetWord;

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
    //this.player.paint();
    this.players.forEach((player) => player.paint());
  }

  paintEnemy() {
    this.enemy.paint();
  }

  paintTarget() {
    this.targets.forEach((target) => target.paintLetter());
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
    //this.player.jump();
    this.players.forEach((player) => player.jump());

    this.enemy.checkIfEnemyShouldJump();
    this.enemy.jump();
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

  enableControls() {
    window.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'Space':
          //if (this.player.enableJumping) {
          if (this.players[0].enableJumping) {
            this.players[0].doJump = true;
          }
          break;
        case 'ArrowUp':
          //if (this.player.enableJumping) {
          if (this.players[1] && this.players[1].enableJumping) {
            this.players[1].doJump = true;
          }
          break;
        /*case 'ArrowRight':
          this.player.accelerationX = 0.2;
          break;
        case 'ArrowLeft':
          this.player.accelerationX = 0.2;
          break;*/
      }
    });
  }

  start(playerSpeed, playerGravity, enemySpeed, enemyGravity) {
    this.chooseTargetWord();
    this.numberOfDisplayedTargets = 0;
    this.collectedTargets = [];
    this.running = true;
    this.layerFrame = 0;
    this.players = [];
    this.displayScreen('playing');
    for (
      let numberOfPlayers = 1;
      numberOfPlayers <= this.currentLevel;
      numberOfPlayers++
    ) {
      this.addPlayer(playerSpeed, playerGravity, numberOfPlayers);
    }
    this.addEnemy(enemySpeed, enemyGravity);
    this.loop();
  }
}
