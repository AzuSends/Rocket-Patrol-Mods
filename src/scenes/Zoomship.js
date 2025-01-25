class Zoomship extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, frame, pointValue) {
        super (scene, x, y, texture, frame)
        scene.add.existing(this)
        this.points = pointValue
        this.moveSpeed = game.settings.spaceshipSpeed * 2
        this.flyingLeft = true //Made the direction swapping into a boolean for easy swapping with a ! operator
    }
 
    update() {
        if (this.flyingLeft == true){
            this.x -= this.moveSpeed
            if(this.x <= 0 - this.width) {
                this.flyingLeft = !this.flyingLeft
            }
        } else {
            this.x += this.moveSpeed
            if(this.x >= game.config.width + this.width) {
                this.flyingLeft = !this.flyingLeft
            }
        }
    }

    reset(){
        this.x = game.config.width
    }
}