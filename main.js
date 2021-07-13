const canvasElement = document.querySelector('canvas');

const screenStartElement = document.getElementById('screen-start');
const screenConfigurePropertiesElement = document.getElementById(
  'screen-configure-properties'
);
const screenPlayingElement = document.getElementById('screen-playing');
const screenEndElement = document.getElementById('screen-end');

const screenElements = {
  start: screenStartElement,
  configureProperties: screenConfigurePropertiesElement,
  playing: screenPlayingElement,
  end: screenEndElement
};

const startButton = screenStartElement.querySelector('button');
const startPlayingButton = screenConfigurePropertiesElement.lastElementChild;

const buttonGroupJumpingPlayer = document.getElementsByName(
  'jumpingPropertyPlayer'
);
const buttonGroupJumpingEnemy = document.getElementsByName(
  'jumpingPropertyEnemy'
);

const tryAgainButton = screenEndElement.querySelector('button');
const game = new Game(canvasElement, screenElements);

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
  game.displayScreen('configureProperties');
});

tryAgainButton.addEventListener('click', () => {
  game.displayScreen('configureProperties');
});
