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

const jumpingPropertyPlayer1Button = document.getElementById(
  'btn-jumping-properties-player-1'
);
const jumpingPropertyPlayer2Button = document.getElementById(
  'btn-jumping-properties-player-2'
);
const jumpingPropertyPlayer3Button = document.getElementById(
  'btn-jumping-properties-player-3'
);

const jumpingPropertyEnemy1Button = document.getElementById(
  'btn-jumping-properties-enemy-1'
);
const jumpingPropertyEnemy2Button = document.getElementById(
  'btn-jumping-properties-enemy-2'
);
const jumpingPropertyEnemy3Button = document.getElementById(
  'btn-jumping-properties-enemy-3'
);

const tryAgainButton = screenEndElement.querySelector('button');
const game = new Game(canvasElement, screenElements);

startButton.addEventListener('click', () => {
  game.displayScreen('configureProperties');
});

const jumpingConfigurationPlayer = {};
let currentPropertyArrayPlayer = [];
const jumpingConfigurationEnemy = {};
let currentPropertyArrayEnemy = [];

jumpingPropertyPlayer1Button.addEventListener('click', () => {
  currentPropertyArrayPlayer = jumpingPropertyPlayer1Button.value.split(', ');
  jumpingConfigurationPlayer.jumpingSpeed = Number(
    currentPropertyArrayPlayer[0]
  );
  jumpingConfigurationPlayer.jumpingGravity = Number(
    currentPropertyArrayPlayer[1]
  );
});

jumpingPropertyPlayer2Button.addEventListener('click', () => {
  currentPropertyArrayPlayer = jumpingPropertyPlayer2Button.value.split(', ');
  jumpingConfigurationPlayer.jumpingSpeed = Number(
    currentPropertyArrayPlayer[0]
  );
  jumpingConfigurationPlayer.jumpingGravity = Number(
    currentPropertyArrayPlayer[1]
  );
});

jumpingPropertyPlayer3Button.addEventListener('click', () => {
  currentPropertyArrayPlayer = jumpingPropertyPlayer3Button.value.split(', ');
  jumpingConfigurationPlayer.jumpingSpeed = Number(
    currentPropertyArrayPlayer[0]
  );
  jumpingConfigurationPlayer.jumpingGravity = Number(
    currentPropertyArrayPlayer[1]
  );
});

jumpingPropertyEnemy1Button.addEventListener('click', () => {
  currentPropertyArrayEnemy = jumpingPropertyEnemy1Button.value.split(', ');
  jumpingConfigurationEnemy.jumpingSpeed = Number(currentPropertyArrayEnemy[0]);
  jumpingConfigurationEnemy.jumpingGravity = Number(
    currentPropertyArrayEnemy[1]
  );
});

jumpingPropertyEnemy2Button.addEventListener('click', () => {
  currentPropertyArrayEnemy = jumpingPropertyEnemy2Button.value.split(', ');
  jumpingConfigurationEnemy.jumpingSpeed = Number(currentPropertyArrayEnemy[0]);
  jumpingConfigurationEnemy.jumpingGravity = Number(
    currentPropertyArrayEnemy[1]
  );
});

jumpingPropertyEnemy3Button.addEventListener('click', () => {
  currentPropertyArrayEnemy = jumpingPropertyEnemy3Button.value.split(', ');
  jumpingConfigurationEnemy.jumpingSpeed = Number(currentPropertyArrayEnemy[0]);
  jumpingConfigurationEnemy.jumpingGravity = Number(
    currentPropertyArrayEnemy[1]
  );
});

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

tryAgainButton.addEventListener('click', () => {
  game.displayScreen('configureProperties');
});
