/**
 *
 * Author: Saurabh Singh
 * All the Game related Characters are implemented here. Implements the Enemy, Player, Obstacle and Gem characters.
 * Only Enemy and Player move, Obstacles and Gems are stationary
 * We assume a fixed size grid and there is no support yet for a Dynamic Grid.
 *
 */
"use strict";
var CELL_WIDTH = 101;
var CELL_HEIGHT = 83;

var PLAYER_START_X = 200;
var PLAYER_START_Y = 380;

var MIN_SPEED = 200;

var score = 0;

/**
 * Character Represents any object in the Game that can be Rendered.
 * It will act as the "Parent" for all other Characters in the Game
 * */
var Character = function() {
    return undefined;
};

/**
 * Draw the Character on the screen using Resources, required method for game
 */

Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Cell position X of the Character on the Grid
Character.prototype.getCellX = function() {
    return getX(this.x + 50);
};

//Cell position Y of the Character on the Grid
Character.prototype.getCellY = function() {
    return getY(this.y + 42);
};

//Update the position of the Character on the screen
Character.prototype.update = function() {
    return undefined;
};

/**
 *  Enemy is of type Character and represents bugs which kill the hero.
 *
 **/

var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    var pos = Math.floor(Math.random() * 3);
    this.x = CELL_WIDTH / 2;
    this.y = CELL_HEIGHT / 2 + (CELL_HEIGHT * pos);
    this.speed = MIN_SPEED + (pos * MIN_SPEED);
};

//Inherit from Character
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

/**
 * Update the enemy's position, required method for game
 * Parameter: dt, a time delta between ticks
 */

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x >= ctx.canvas.width) {
        this.x = 1;
    } else {
        this.x = this.x + (this.speed * dt);
    }

    /* The collision logic is implemented here, on every update of the enemy position
     we check if this enemy object happens to be in the same cell as the Player Object
     */
    if (this.getCellX() === player.getCellX() && this.getCellY() === player.getCellY()) {
        alert("You Lost!");
        startGame();
    }
};

/**
 *  Player is of type character and represents the games hero
 *  This class requires an handleInput() method to allow moving the player.
 *  */
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = PLAYER_START_X;
    this.y = PLAYER_START_Y;
};

//Inherit from Character
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

/* The handleInput method responds based on the direction in which the player intends to move
 *   It does bound check on each move
 *   It checks for obstacles on each move
 *   It also checks to see if this is the goal cell or a Gem which means bonus points
 * */
Player.prototype.handleInput = function(key) {
    /* Move left by one cell if no obstacles */
    var tempWidth;
    var tempHeight;
    var newX;
    var newY;
    if (key === 'left') {
        tempWidth = this.x - CELL_WIDTH;
        newX = getX(tempWidth);
        newY = getY(this.y);
        if (tempWidth > -CELL_WIDTH && isObstacle(newX, newY)) {
            this.x = tempWidth;
        }

    } else if (key === 'right') {
        tempWidth = this.x + CELL_WIDTH;
        newX = getX(tempWidth);
        newY = getY(this.y);
        if (tempWidth < ctx.canvas.width - CELL_WIDTH && isObstacle(newX, newY)) {
            this.x = tempWidth;
        }
    } else if (key === 'up') {
        tempHeight = this.y - CELL_HEIGHT;
        newX = getX(this.x);
        newY = getY(tempHeight);
        if (tempHeight > 0 && isObstacle(newX, newY)) {
            this.y = tempHeight;
        }
    } else {
        tempHeight = this.y + CELL_HEIGHT;
        newX = getX(this.x);
        newY = getY(tempHeight);
        if (tempHeight < ctx.canvas.width - CELL_HEIGHT && isObstacle(newX, newY)) {
            this.y = tempHeight;
        }
    }
    /* Check if we found a Gem after the Move! */
    if (isGem(this.getCellX(), this.getCellY())) {
        var gemIndex = gemIndices.indexOf(this.getCellX() + "" + this.getCellY());
        /* Also check if this happens to be the Goal cell */
        if (gems[gemIndex].isKey) {
            score += 100;
            alert("You Won! Your score : " + score);
            location.reload();
        }
        /* We found a Gem, credit the player with points and remove the gem from the list */
        score += 10;
        gems.splice(gemIndex, 1);
        gemIndices.splice(gemIndex, 1);
        document.getElementById("score").innerHTML = score;
    }
};

/**
 *  Obstacle is of type Character and represents cell which cannot be occupied by the player
 *  */
var Obstacle = function(x, y) {
    this.sprite = 'images/Rock.png';
    this.x = x;
    this.y = y;
};

//Inherit from Character
Obstacle.prototype = Object.create(Character.prototype);
Obstacle.prototype.constructor = Obstacle;

/* Gem is of type Character and represents bonus points and we set one of them as the Goal */
var Gem = function(x, y) {
    this.sprite = 'images/Gem Blue.png';
    this.x = x;
    this.y = y;
    this.isGoal = false;
};

//Inherit from Character
Gem.prototype = Object.create(Character.prototype);
Gem.prototype.constructor = Gem;

Gem.prototype.setKeyGoal = function() {
    this.sprite = 'images/Key.png';
    this.isKey = true;
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        '37': 'left',
        '38': 'up',
        '39': 'right',
        '40': 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Cell position X of the Character on the Grid extracted from the actual position on the canvas
function getX(x) {
    return Math.ceil((x + 50) / CELL_WIDTH);
}

//Cell position Y of the Character on the Grid extracted from the actual position on the canvas
function getY(y) {
    return Math.ceil((y + 42) / CELL_HEIGHT);
}

//Check if cell is an obstacle from the obstacles list
function isObstacle(x, y) {
    return obstacleIndices.indexOf(x + "" + y) === -1;
}

//Check if cell has a Gem from the gems list
function isGem(x, y) {
    return gemIndices.indexOf(x + "" + y) !== -1;
}

/**
 *  Code below will initialize and start the Games enemies, player, obstacles and gems
 *  */
var allEnemies, player, obstacleIndices, obstacles, gemIndices, gems;
/**
 * Here is where we actually create the Enemies, Player, Obstacles and Gems
 * We also Initialize the positions for all these characters
 * We Set the Goal where the player should reach to Win!
 *
 * This will also serve as a "reset" when the Player wins or loses
 */
function startGame() {
    // Now instantiate your objects.
    // Place all enemy objects in an array called allEnemies
    // Place the player object in a variable called player
    allEnemies = [new Enemy(), new Enemy(), new Enemy()];
    player = new Player();
    var obstacleLocations = [
        [0, 42],
        [202, 208]
    ];
    obstacleIndices = [];
    obstacles = [];

    /* Create Obstacles from the positions */
    var index;
    for (index = 0; index < obstacleLocations.length; index += 1) {
        obstacles[index] = new Obstacle(obstacleLocations[index][0], obstacleLocations[index][1]);
        obstacleIndices[index] = obstacles[index].getCellX() + "" + obstacles[index].getCellY();
    }

    var gemLocations = [
        [0, 208],
        [404, 125],
        [202, 42]
    ];
    gemIndices = [];
    gems = [];

    /* Create Gems from the positions */
    for (index = 0; index < gemLocations.length; index += 1) {
        gems[index] = new Gem(gemLocations[index][0], gemLocations[index][1]);
        gemIndices[index] = gems[index].getCellX() + "" + gems[index].getCellY();
    }

    /* Set a Goal where the player should reach to Win */
    gems[2].setKeyGoal();
    score = 0;
    document.getElementById("score").innerHTML = 0;
}