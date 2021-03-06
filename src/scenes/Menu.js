class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/assets_blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
        this.load.audio('sfx_explosion2', './assets/explosion2.wav');
        this.load.audio('sfx_explosion3', './assets/explosion3.wav');
        this.load.audio('sfx_explosion4', './assets/explosion4.wav');
        this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav');

        this.load.image('title_screen', './assets/title_screen.png');
        this.load.audio('title_music', './assets/title_music.wav');
    }

    create() {

        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show title screen image
        this.title_screen = this.add.tileSprite(0, 0, 640, 480, 'title_screen').setOrigin(0, 0);

        // show menu text
        //this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'RETAIL WARS', menuConfig).setOrigin(0.5);
        //this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        //menuConfig.backgroundColor = '#00FF00';
        //menuConfig.color = '#000';
        //this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // play audio 
        var music = this.sound.add('title_music');
        music.setLoop(true);
        music.play();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 2,
                countdown: 60,
                //speedTimer: 3000,
                gameTimer: 60000
            }
            this.sound.get('title_music').stop();
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                countdown: 45,
                //speedTimer: 3000,
                gameTimer: 45000,
            }
            this.sound.get('title_music').stop();
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}