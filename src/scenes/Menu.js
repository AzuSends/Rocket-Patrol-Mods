class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png')
        this.load.image('spaceship', './assets/spaceship.png')
        this.load.image('zoomship', './assets/zoomship.png')
        this.load.image('starfield', './assets/starfield.png')
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })

        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')
        
    }

    create() {
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        })
        

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
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'Use ↔ arrows to move and (F) to fire', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = "#00FF00"
        menuConfig.color = "#000"
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5)
        menuConfig.fontSize = "20px"
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize *2 + borderPadding * 2, 'For 2 Players ↑ for Novice or ↓ for Expert', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = "#000000"
        menuConfig.color = "#FFFFFF"
        menuConfig.fontSize = "28px"
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize *4 + borderPadding * 4, 'High Score: ' + highScore, menuConfig).setOrigin(0.5)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000,
            currentPlayer: 0,
            multiplayer: false,
            p1score: 0,
            p2score: 0
          }
          this.sound.play('sfx-select')
          this.scene.start('playScene')    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000,
            currentPlayer: 0,
            multiplayer: false,
            p1score: 0,
            p2score: 0
          }
          this.sound.play('sfx-select')
          this.scene.start('playScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000,
            currentPlayer: 0,
            multiplayer: true,
            p1score: 0,
            p2score: 0
          }
          this.sound.play('sfx-select')
          this.scene.start('multiplayerScene')    
        }
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000,
            currentPlayer: 0,
            multiplayer: true,
            p1score: 0,
            p2score: 0
          }
          this.sound.play('sfx-select')
          this.scene.start('multiplayerScene')
        }
      }
}