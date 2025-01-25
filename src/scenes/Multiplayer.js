class Multiplayer extends Phaser.Scene {
    constructor() {
        super("multiplayerScene")
    }


    create() {
        
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)


        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '36px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
        }
        if (game.settings.currentPlayer == 0){
            this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'PLAYER 1', menuConfig).setOrigin(0.5)
            menuConfig.fontSize = '28px'
            this.add.text(game.config.width/2, game.config.height/2 , '↑ to begin ', menuConfig).setOrigin(0.5)
        } else if (game.settings.currentPlayer == 1){
            this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'PLAYER 2', menuConfig).setOrigin(0.5)
            menuConfig.fontSize = '28px'
            this.add.text(game.config.width/2, game.config.height/2 , '↑ to begin ', menuConfig).setOrigin(0.5)
        } else{
            this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'GAME OVER', menuConfig).setOrigin(0.5)
            menuConfig.fontSize = '20px'
            this.add.text(game.config.width/2, game.config.height/2 , 'P1 Score: ' + game.settings.p1score + '     P2 Score: ' + game.settings.p2score, menuConfig).setOrigin(0.5)
            menuConfig.fontSize = '28px'
            if (game.settings.p1score > game.settings.p2score){
                this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Player 1 Wins', menuConfig).setOrigin(0.5)
            } else if (game.settings.p1score < game.settings.p2score){
                this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Player 2 Wins', menuConfig ).setOrigin(0.5)
            } else {
                this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Tied Game',menuConfig  ).setOrigin(0.5)
            }
            this.add.text(game.config.width/2, game.config.height/2 + borderUISize* 2 + borderPadding*2, 'Press (R) to Restart or ↓ for Menu',menuConfig  ).setOrigin(0.5)
    
        }




    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyUP) && game.settings.currentPlayer != 2) {
            console.log("!")
            this.scene.start("playScene")
        }
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            console.log("?")
            this.scene.start("menuScene")
        } 
        if (Phaser.Input.Keyboard.JustDown(keyRESET)) {
            game.settings.currentPlayer = 0

            this.scene.start("playScene")
        } 
    }
}