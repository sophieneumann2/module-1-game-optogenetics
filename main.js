const canvasElement = document.querySelector('canvas');
const game = new Game(canvasElement);
console.dir(game);
game.addPlayer();
game.addTarget();
game.paint();
game.runLogic();
