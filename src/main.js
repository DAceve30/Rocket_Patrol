let config ={
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let game = new Phaser.Game(config);