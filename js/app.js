class Enemy {
    constructor(sprite, x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = sprite;
    }

    update(dt) {
        this.x < 500 ? this.x = this.x + (101 * dt * this.speed) : this.x = -200;
        if (this.x === -200) {
            this.speed = getRandSpeed();
        }
        this.checkCollision();
    }

    // Check if the player and enemies/bugs have collided.
    checkCollision() {
        const buffer = 60;
        // Create a 'field' around the enemy
        const upperX = this.x + buffer;
        const lowerX = this.x - buffer;
        /* If the player is within the enemy's 'field' and they're in the same lane, the player is hit. */
        if (player.x <= upperX && player.x >= lowerX && player.y === this.y) {
            player.resetPlayer(0);
            allEnemies.forEach(enemy => enemy.resetEnemy());
            styleLossMessage();
        }
    }

    // Reset the enemy positioning to the start of the board and assign a new, random speed.
    resetEnemy() {
        this.x = 0;
        this.speed = getRandSpeed();
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

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

    // Check if the player has moved into the water zone (game won).
    checkWin() {
        if (this.y < 0) {
            this.resetPlayer(250);
            styleWinMessage();
        }
    }

    // Reset the player's positioning with an optional delay.
    resetPlayer(resetTime) {
        window.setTimeout(() => {
            this.x = 202;
            this.y = 373.5;
        }, resetTime);
    }
}

// Calculate a random speed for the enemies with a minimum of 1.5.
function getRandSpeed() {
    return (Math.random() * 3) + 1.5;
}

// Congratulate the player on a win.
function styleWinMessage() {
    message.textContent = `You've Won!`;
    message.style.color = '#22b77f';
    message.style.border = '1px solid #22b77f';
    setTimeout(resetMessage, 2000);
}

// Inform the player of their loss.
function styleLossMessage() {
    message.textContent = `You've Lost!`;
    message.style.color = '#fc0000';
    message.style.border = '1px solid #fc0000';
    setTimeout(resetMessage, 2000);
}

// Reset the message div.
function resetMessage() {
    message.textContent = "";
    message.style.border = 'none';
}

// Create a div for the win/loss messages.
const message = document.createElement('div');
message.classList.add('message');
// Append new div element after everything else has loaded to ensure proper positioning.
window.onload = function() {
    document.body.appendChild(message);
}

const playerSprite = 'images/char-boy.png';
const player = new Player(playerSprite, 202, 373.5);
const allEnemies = [];

// Calculate Y positions of enemies and add to allEnemies.
for (let i = 0; i < 3; i++) {
    let nextYPos;
    let speed = getRandSpeed();
    i === 0 ? nextYPos = 41.5 : nextYPos = 41.5 + (83 * i);
    const newEnemy = new Enemy('images/enemy-bug.png', 0, nextYPos, speed);
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