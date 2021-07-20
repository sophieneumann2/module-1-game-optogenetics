const canvasGameElement = document.getElementById('canvas-game');
const canvasDemoElement = document.getElementById('canvas-demo');

const screenStartElement = document.getElementById('screen-start');
const screenConfigurePropertiesElement = document.getElementById(
  'screen-configure-properties'
);
const screenPlayingElement = document.getElementById('screen-playing');
const screenEndElement = document.getElementById('screen-end');
const screenDemoElement = document.getElementById('screen-demo');

const screenElements = {
  start: screenStartElement,
  configureProperties: screenConfigurePropertiesElement,
  playing: screenPlayingElement,
  end: screenEndElement,
  demo: screenDemoElement
};

const startButton = document.getElementById('btn-start-game');
const startPlayingButton = document.getElementById('btn-start-playing');
const buttonGroupJumpingPlayer = document.getElementsByName(
  'jumpingPropertyPlayer'
);
const buttonGroupJumpingEnemy = document.getElementsByName(
  'jumpingPropertyEnemy'
);
const tryAgainButton = document.getElementById('btn-try-again');
const nextLevelButton = document.getElementById('btn-next-level');

const game = new Game(canvasGameElement, screenElements);

const jumpingConfigurationPlayer = {};
let currentPropertyArrayPlayer = [];
const jumpingConfigurationEnemy = {};
let currentPropertyArrayEnemy = [];

for (let playerButton of buttonGroupJumpingPlayer) {
  playerButton.addEventListener('click', () => {
    currentPropertyArrayPlayer = playerButton.value.split(', ');
    jumpingConfigurationPlayer.jumpingSpeed = Number(
      currentPropertyArrayPlayer[0]
    );
    jumpingConfigurationPlayer.jumpingGravity = Number(
      currentPropertyArrayPlayer[1]
    );
  });
}

for (let enemyButton of buttonGroupJumpingEnemy) {
  enemyButton.addEventListener('click', () => {
    currentPropertyArrayEnemy = enemyButton.value.split(', ');
    jumpingConfigurationEnemy.jumpingSpeed = Number(
      currentPropertyArrayEnemy[0]
    );
    jumpingConfigurationEnemy.jumpingGravity = Number(
      currentPropertyArrayEnemy[1]
    );
  });
}

startPlayingButton.addEventListener('click', () => {
  if (
    Object.keys(jumpingConfigurationPlayer).length ||
    Object.keys(jumpingConfigurationEnemy).length
  ) {
    game.start(
      jumpingConfigurationPlayer.jumpingSpeed,
      jumpingConfigurationPlayer.jumpingGravity,
      jumpingConfigurationEnemy.jumpingSpeed,
      jumpingConfigurationEnemy.jumpingGravity
    );
  } else {
    window.alert('Please select superpowers before playing.');
  }
});

startButton.addEventListener('click', () => {
  const demo = new Demo(canvasDemoElement, game);
  game.displayScreen('demo');
  demo.start();
});

tryAgainButton.addEventListener('click', () => {
  game.displayScreen('configureProperties');
});

nextLevelButton.addEventListener('click', () => {
  if (game.currentLevel < 2) {
  }
  game.currentLevel++;
  game.displayScreen('configureProperties');
});
