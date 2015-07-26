var cellWidth = 101;
var cellHeight = 83;

var playerStartX = 200;
var playerStartY = 380;

var minSpeed = 200;

/*Character Represents any renderable object in the Game*/
var Character = function(){};

// Draw the Character on the screen, required method for game
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Cell position X of the Character on the Grid
Character.prototype.getCellX = function()
{
    return getX(this.x+50);
};

//Cell position Y of the Character on the Grid
Character.prototype.getCellY = function()
{
    return getY(this.y+42);
};

//Update the position of the Character on the screen
Character.prototype.update = function(dt) {};

/* Enemy is of type Character and represents bugs which kill the hero */
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    var pos = Math.floor(Math.random() * 3);
    this.x = cellWidth/2;
    this.y = cellHeight/2 + (cellHeight * pos);
    this.speed = minSpeed + (pos * minSpeed);
};

//Inherit from Character
Enemy.prototype = Object.create(Character.prototype);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x >= ctx.canvas.width)
        this.x = 1;
    else
        this.x = this.x + (this.speed*dt);

    if (this.getCellX() === player.getCellX() && this.getCellY() === player.getCellY())
    {
        alert("You Lost!");
        startGame();
    }
};

/* Player is of type character and represents the games hero */
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = playerStartX;
    this.y = playerStartY;
    //console.log("x - " + Math.ceil((this.x+101)/101));
    //console.log("y - " + Math.ceil((this.y+83)/83));
};

//Inherit from Character
Player.prototype = Object.create(Character.prototype);

Player.prototype.handleInput = function(key){
    if (key === 'left')
    {
        var tempWidth = this.x - cellWidth;
        var newX = getX(tempWidth);
        var newY = getY(this.y);
        if(tempWidth > -cellWidth && isObstacle(newX, newY)) {
            this.x = tempWidth;
        }

    }
    else if (key === 'right')
    {
        var tempWidth = this.x + cellWidth;
        var newX = getX(tempWidth);
        var newY = getY(this.y);
        if(tempWidth < ctx.canvas.width - cellWidth && isObstacle(newX, newY)) {
            this.x = tempWidth;
        }
    }
    else if (key === 'up')
    {
        var tempHeight = this.y - cellHeight;
        var newX = getX(this.x);
        var newY = getY(tempHeight);
        if(tempHeight > -cellHeight && isObstacle(newX, newY)) {
            this.y = tempHeight;
            if (this.y + cellHeight <= cellHeight) {
                this.x = playerStartX;
                this.y = playerStartY;
                console.log("You won!")
            }
        }
    }
    else
    {
        var tempHeight = this.y + cellHeight;
        if(tempHeight < ctx.canvas.width - cellHeight  && isObstacle(newX, newY)) {
            this.y = tempHeight;
        }
    }

    if (isGem(this.getCellX(), this.getCellY()))
    {
        var gemIndex = gemIndices.indexOf(this.getCellX() + "" + this.getCellY());
        if(gems[gemIndex].isKey)
        {
            alert("You Won!");
            startGame();
        }
        gems.splice(gemIndex, 1);
        gemIndices.splice(gemIndex, 1)
    }
};

/* Obstacle is of type Character */
var Obstacle = function(x, y)
{
    this.sprite = 'images/Rock.png';
    this.x = x;
    this.y = y;
};

//Inherit from Character
Obstacle.prototype = Object.create(Character.prototype);


/* Gem is of type Character and represents bonus points */
var Gem = function(x, y)
{
    this.sprite = 'images/Gem Blue.png';
    this.x = x;
    this.y = y;
    this.isGoal = false;
};

//Inherit from Character
Gem.prototype = Object.create(Character.prototype);

Gem.prototype.setKeyGoal = function () {
    this.sprite = 'images/Key.png';
    this.isKey = true;
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Cell position X of the Character on the Grid
function getX(x)
{
    return Math.ceil((x+50)/cellWidth)
};

//Cell position Y of the Character on the Grid
function getY(y)
{
    return Math.ceil((y+42)/cellHeight);
};

//Check if cell is an obstacle
function isObstacle(x, y)
{
    return obstacleIndices.indexOf(x + "" + y) === -1;
}

//Check if cell has a Gem
function isGem(x, y)
{
    return gemIndices.indexOf(x + "" + y) !== -1;
}

/* Code below will initialize and start the Games enemies, player, obstacles and gems */
var allEnemies, player, obstacleIndices, obstacles, gemIndices, gems;

function startGame() {
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
    allEnemies = [new Enemy(), new Enemy(), new Enemy()];
    player = new Player();
    var obstacleLocations = [[0, 42], [202, 208]];
    obstacleIndices = [];
    obstacles = [];
    for (var index = 0; index < obstacleLocations.length; index++) {
        obstacles[index] = new Obstacle(obstacleLocations[index][0], obstacleLocations[index][1]);
        obstacleIndices[index] = obstacles[index].getCellX() + "" + obstacles[index].getCellY();
    }

    var gemLocations = [[0, 208], [404, 125], [202, 42]];
    gemIndices = [];
    gems = [];
    for (var index = 0; index < gemLocations.length; index++) {
        gems[index] = new Gem(gemLocations[index][0], gemLocations[index][1]);
        gemIndices[index] = gems[index].getCellX() + "" + gems[index].getCellY();
    }

    gems[2].setKeyGoal();
}