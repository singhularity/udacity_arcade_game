var cellWidth = 101;
var cellHeight = 83;

var playerStartX = 200;
var playerStartY = 380;

var minSpeed = 200;

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
        console.log("You Lost!");
        player.x = playerStartX;
        player.y = playerStartY;
    }
};

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
        if(tempWidth > -cellWidth && obstacleIndices.indexOf(getX(tempWidth)+ "" + getY(this.y)) === -1) {
            this.x = tempWidth;
            //console.log("x - " + Math.ceil((this.x+101)/101));
        }

    }
    else if (key === 'right')
    {
        var tempWidth = this.x + cellWidth;
        if(tempWidth < ctx.canvas.width - cellWidth && obstacleIndices.indexOf(getX(tempWidth) + "" + getY(this.y)) === -1) {
            this.x = tempWidth;
            //console.log("x - " + Math.ceil((this.x+101)/101));
        }
    }
    else if (key === 'up')
    {
        var tempHeight = this.y - cellHeight;
        if(tempHeight > -cellHeight   && obstacleIndices.indexOf(getX(this.x) + "" + getY(tempHeight)) === -1) {
            this.y = tempHeight;
            //console.log("y - " + Math.ceil((this.y+83)/83));
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
        if(tempHeight < ctx.canvas.width - cellHeight  && obstacleIndices.indexOf(getX(this.x) + "" + getY(tempHeight)) === -1) {
            this.y = tempHeight;
        }
    }
};

var Obstacle = function(x, y)
{
    this.sprite = 'images/Rock.png';
    this.x = x;
    this.y = y;
};

//Inherit from Character
Obstacle.prototype = Object.create(Character.prototype);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();
var obstacleLocations = [[0, 42], [202, 208]];
var obstacleIndices = [];
var obstacles = [];
for(var index = 0; index < obstacleLocations.length; index++)
{
    obstacles[index] = new Obstacle(obstacleLocations[index][0], obstacleLocations[index][1]);
    obstacleIndices[index] = obstacles[index].getCellX() + "" + obstacles[index].getCellY();
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
