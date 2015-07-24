// Enemies our player must avoid
var Enemy = function(pos, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.pos = pos;
    this.x = 50;
    this.y = 42 + (83 * pos);
    this.speed = speed;
};

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

    if ((Math.ceil((this.x+50)/101)) === Math.ceil((player.x+101)/101) && Math.ceil((this.y+42)/83) === Math.ceil((player.y+83)/83))
    {
        console.log("You Lost!");
        player.x = 200;
        player.y = 380;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
    this.x = 200;
    this.y = 380;
    //console.log("x - " + Math.ceil((this.x+101)/101));
    //console.log("y - " + Math.ceil((this.y+83)/83));
};

Player.prototype.handleInput = function(key){
    if (key === 'left')
    {
        if(this.x - 101 > -101) {
            this.x -= 101;
            //console.log("x - " + Math.ceil((this.x+101)/101));
        }

    }
    else if (key === 'right')
    {
        if(this.x + 101 < ctx.canvas.width - 101) {
            this.x += 101;
            //console.log("x - " + Math.ceil((this.x+101)/101));
        }
    }
    else if (key === 'up')
    {
        if(this.y - 83 > -83) {
            this.y -= 83;
            //console.log("y - " + Math.ceil((this.y+83)/83));
            if (this.y + 83 <= 83) {
                this.y = 380;
                this.x = 200;
                console.log("You won!")
            }

        }

    }
    else
    {
        if(this.y + 83 < (ctx.canvas.width - 83)) {
            this.y += 83;
            //console.log("y - " + Math.ceil((this.y+83)/83));
        }
    }
    //if(enemyPositions.indexOf(Math.ceil((this.x+101)/101)) > -1 &&
    //    Math.ceil((allEnemies[enemyPositions.indexOf(Math.ceil((this.x+101)/101))].y+83)/83) == Math.ceil((this.y+83)/83))
    //{
    //    console.log("Collission");
    //}
    //console.log("x - " + Math.ceil((this.x+101)/101));
    //console.log("y - " + Math.ceil((this.y+83)/83));

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x;
};


// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemyPositions = [1, 1];
var allEnemies = [new Enemy(0, 200), new Enemy(1, 400)];
var player = new Player();


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
