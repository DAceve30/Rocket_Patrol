class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield2.png');
        this.load.image('racks', './assets/racks.png');
        this.load.image('border', './assets/border.png');
        this.load.spritesheet('explosion', './assets/explosion2.png', {frameWidth: 50, frameHeight: 50, startFrame: 0, endFrame: 8});
        this.load.spritesheet('spaceship2', './assets/spaceship_anim.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 3});
        this.load.audio('bg_music', './assets/bg_music.wav');
    }
    create() {
        // play audio 
        var music = this.sound.add('bg_music');
        music.setLoop(true);
        music.play();

        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // place 2nd tile sprites
        this.racks = this.add.tileSprite(0, 0, 640, 480, 'racks').setOrigin(0, 0);
        
        // green UI background
        //this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FFFF).setOrigin(0,0);

        // white borders
        /*this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);*/
        
        // place border
        this.border = this.add.tileSprite(0, 0, 640, 480, 'border').setOrigin(0, 0);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        
        // spaceship animation config
        this.anims.create({
            key: 'ship',
            frames: this.anims.generateFrameNumbers('spaceship2', {start: 0, end: 3, first: 0}),
            frameRate: 30,
            repeat: -1
        });

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'ship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'ship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'ship', 0, 10).setOrigin(0, 0);
        
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 8, first: 0}),
            frameRate: 30
        });

        //initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            backgroundColor: '#0f7bdc',
            color: '#e9de0c',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, '$ ' + this.p1Score, scoreConfig);

        // display 'FIRE' UI text
        let fireConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            backgroundColor: '#0f7bdc',
            color: '#e9de0c',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.fireCenter = this.add.text(borderUISize + borderPadding*22.5, borderUISize + borderPadding*2, 'FIRE', fireConfig);

        // GAME OVER flag
        this.gameOver = false;
        
        // 60-second play clock
        scoreConfig.fixedWidth = 0;

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        // Sets up countdown timer
        let timerConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            backgroundColor: '#0f7bdc',
            color: '#e9de0c',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        //this.countdown = 60;
        this.timer = this.add.text(borderUISize + borderPadding*43.5, borderUISize + borderPadding*2, game.settings.countdown, timerConfig);

        // Increase spaceship speed after 30 seconds
        /*this.speedClock = this.time.delayedCall(game.settings.speedTimer, () => {
            game.settings.spaceshipSpeed += 5;
        }, null, this);*/

        /*speedUp = false;

        if (((game.settings.gameTimer == 60000 && this.clock.getRemainingSeconds() <= 30000) || (game.settings.gameTimer == 45000 
            && this.clock.getRemainingSeconds() <= 15000)) && !speedUp){
            game.settings.spaceshipSpeed *= 2;
            speedUp = true;
        }*/

        // 60-second timer
        //timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });
    }
    update() {

        // Display animated sprites
        this.ship01.anims.play('ship');
        this.ship02.anims.play('ship');
        this.ship03.anims.play('ship');

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            music.stop();
            this.scene.restart();
        }
        
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            music.stop();
            this.scene.start("menuScene");
        }

        // Display timer
        this.timer.text = this.clock.getRemainingSeconds().toFixed(0);

        // Scrolls BG vertically
        this.starfield.tilePositionY -= 2;

        // Scrolls extra BG assets separately
        this.racks.tilePositionY -= 2.5;
        
        if(!this.gameOver) {
        this.p1Rocket.update();
        this.ship01.update();               // update spaceships (x3)
        this.ship02.update();
        this.ship03.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
            } else {
                return false;
            }
        }
    
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = '$ ' + this.p1Score;
        
        // attempting to randomize explosion sound

        //var index = Math.round(Math.random() * this.sounds.length);
        //var sound = this.sounds[index];
        //this.sound.play('sfx_explosion', 'sfx_explosion2', 'sfx_explosion3', 'sfx_explosion4');
        this.sound.play('sfx_explosion');
        //sound.play();
    }
}