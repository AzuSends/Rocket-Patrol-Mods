class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    
    create() {
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)

        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)

        this.ship01 = new Zoomship(this, game.config.width + borderUISize*6, borderUISize*4, 'zoomship', 0, 60).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0)

        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        this.p1Score = 0
        timer = game.settings.gameTimer

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)
        
        scoreConfig.align = 'left'
        this.timerRight = this.add.text(borderUISize * 15 + borderPadding, borderUISize + borderPadding*2, timer / 1000, scoreConfig)

        this.gameOver = false
        scoreConfig.fixedWidth = 0
        this.makeTick()
    }
    update() {
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
          }

        this.starfield.tilePositionX -= 4
        if(!this.gameOver) {               
            this.p1Rocket.update()
            this.ship01.update()
            this.ship02.update()
            this.ship03.update()
        } 

        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)
            timer += tick
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
            timer += tick
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
            timer += tick
        }

        
    }

    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true
        } else {
          return false
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode')             // play explode animation
        boom.on('animationcomplete', () => {   // callback after anim completes
          ship.reset()                         // reset ship position
          ship.alpha = 1                       // make ship visible again
          boom.destroy()                       // remove explosion sprite
        })       
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score   
        this.sound.play('sfx-explosion')
      }

  makeTick(){
    let scoreConfig = {
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
    this.clock = this.time.delayedCall(tick, () => {
        timer -= tick
        console.log(timer)
        this.timerRight.text = timer / 1000
        if (timer <= 0){ 
            if (this.p1Score > highScore){
                highScore = this.p1Score
            }
            if (game.settings.multiplayer){
                if (game.settings.currentPlayer == 0){
                    game.settings.p1score = this.p1Score
                } else if (game.settings.currentPlayer == 1){
                    game.settings.p2score = this.p1Score
                }
                game.settings.currentPlayer += 1
                this.scene.start("multiplayerScene")
            } else {
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5)
                this.gameOver = true
            }
        } else {
            this.makeTick()
        }
    }, null, this)

  } 
}