let config ={
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

// create timer
var c = 60;
var timedEvent;

/* 
Name: Luis Diego Acevedo
Title: Retail Wars
Date: 4/23/2022
Hours: 15+ (unsure, but a lot)

Points Breakdown:
60 + 5 + 5 + 5 + 10 + 10 = 95

(60) Redesign the game's artwork, UI, and sound to change its theme/aesthetic
- All assets changed to "retail store" theme
(5) Implement 'FIRE' UI text from the original game
(5) Add your own background music to the Play scene
- Added title screen music (Kevin MacLeod ~ Local Forecast - Elevator)
- Added BGM for Play scene (Ys I&II ~ The Syonin)
(5) Allow the player to control the Rocket after it's fired
(10) Display the time remaining (in seconds) on the screen
- Works somewhat correctly, but with this included the game crashes once the time limit is reached
(10) Implement parallax scrolling
- The "racks" asset scrolls separately from the scrolling tile background

Note: There was also an attempt at implementing other functions but none of them worked for me. Considering I'm late with this already I'd rather spend the time trying to work on my group project. Please understand.
*/

