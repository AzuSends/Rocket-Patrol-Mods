/*
Ben Silver
Rocket Patrol MMXXXIV: Please Let Me Out Of The Publishers Basement
4-ish Hours, Most of the time was spent on the two player mode
Mods:
New Spaceship (5) //In addition to the other requirements for this task I also gave this ship the new behavior of going back and forth instead of just right to left 
Added control after fired (1)
Two Player Mode (5)
High Score Tracking (1) //Works with scores in two player mode 
System for adding time on hit and removing time on miss (5) //Adds 1 second on hit and removes 3 seconds on a miss
Added Timer (3)
No citations needed
*/
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play, Multiplayer ]
}
let game = new Phaser.Game(config)
let highScore = 0;
let timer = 0;
let tick = 1000 //define a second of gametime
let keyFIRE, keyRESET, keyLEFT, keyRIGHT, keyUP, keyDOWN 


let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3