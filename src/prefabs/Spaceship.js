// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
    }

    update() {
        // move spaceship left
        /*let dirSelect = 0;
        dirSelect.random();

        if (dirSelect == 0){
            this.x -= this.moveSpeed;
            if(this.x <= 0 - this.width) {
                this.reset();
            }
        } else {
            this.x += this.moveSpeed;
            if(this.x >= 0 - this.width) {
                this.reset();
            }
        }*/

        this.x -= this.moveSpeed;
        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }

    // position reset
    reset() {
        this.x = game.config.width;
    }
}