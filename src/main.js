let config = {
  type: Phaser.CANVAS,
  render: {
    pixelArt: true
  },
  width: 320,
  height: 240,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  zoom: 2,
  scene: [Overworld]
}
let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
