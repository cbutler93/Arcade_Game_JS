// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x < 500 ? this.x = this.x + (101 * dt * this.speed) : this.x = -200;
    if (this.x === -200) {
        this.speed = getRandSpeed();
    }
    this.checkCollision();
};

Enemy.prototype.checkCollision = function() {
    const lowerX = player.x - 15;
    const upperX = player.x + 15;
    if (this.x >= lowerX && this.x <= upperX && this.y === player.y) {
        player.resetPlayer(0);
        allEnemies.forEach(enemy => enemy.resetEnemy());
    }
}

Enemy.prototype.resetEnemy = function() {
    this.x = 0;
    this.speed = getRandSpeed();
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }

    update(dir) {
        switch (dir) {
            case 'up':
                this.y -= 83;
                break;
            case 'down':
                this.y += 83;
                break;
            case 'left':
                this.x -= 101;
                break;
            case 'right':
                this.x += 101;
        }
        this.checkWin();
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(dir) {
        if (dir === 'left' && this.x > 0) {
            this.update(dir);
        } else if (dir === 'right' && this.x < 400) {
            this.update(dir);
        } else if (dir === 'up' && this.y > 0) {
            this.update(dir);
        } else if (dir === 'down' && this.y < 373) {
            this.update(dir);
        }
        this.render();
    }

    checkWin() {
        if (this.y < 0) {
            this.resetPlayer(250);
        }
    }

    resetPlayer(resetTime) {
        window.setTimeout(() => {
            this.x = 202;
            this.y = 373.5;
        }, resetTime);
    }
}

function getRandSpeed() {
    return (Math.random() * 3) + 1.5;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const playerImg = 'images/char-boy.png';
const player = new Player(playerImg, 202, 373.5);

const allEnemies = [];
// Calculate Y positions of enemies and add to allEnemies.
for (let i = 0; i < 3; i++) {
    let nextPos;
    let speed = getRandSpeed();
    i === 0 ? nextPos = 41.5 : nextPos = 41.5 + (83 * i);
    const newEnemy = new Enemy(0, nextPos, speed);
    allEnemies.push(newEnemy);
}

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