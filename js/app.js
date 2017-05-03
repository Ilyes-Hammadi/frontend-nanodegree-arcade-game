/**
 * Enemy class
 */

// Enemy global variables
const ENEMY_BORDER_X = 530;

const ENEMY_WIDTH = 70;
const ENEMY_HEIGHT = 60;

var Enemy = function (x, y, speed) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started
	this.x = x;
	this.y = y;
	this.speed = speed;
	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.x += this.speed * dt;

	// Reset the enmeny position to initial when he hit the canvas width border
	if (this.x >= ENEMY_BORDER_X) {
		this.x = -100;
	}

	// After each update check for collisions with the player
	this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function () {
	// check for collision between enemy and player
	const collidedOnXAxes = this.x + ENEMY_WIDTH >= player.x && this.x <= player.x + PLAYER_WIDTH;
	const collidedOnYAxes = this.y + ENEMY_HEIGHT >= player.y && this.y <= player.y + PLAYER_HEIGHT - 20;

	if (collidedOnXAxes && collidedOnYAxes) {
		console.log("Collided");
		gameOver();
	}
};

/**
 *  Player class
 */

// Player global variables
const PLAYER_INIT_X = 200;
const PLAYER_INIT_Y = 300;
const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 80;
const PLAYER_SPEED = 100;

const Player = function () {
	this.x = PLAYER_INIT_X;
	this.y = PLAYER_INIT_Y;
	this.speed = PLAYER_SPEED;
	this.sprite = 'images/char-boy.png';
};

Player.prototype.init = function () {
	this.x = PLAYER_INIT_X;
	this.y = PLAYER_INIT_Y;
};

Player.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function (dt) {
	console.log("Player x: " + this.x);
	console.log("Player y: " + this.y);
	// Check collisions between the canvas border
	// In the X axes
	if (this.x >= 400) {
		this.x = 400;
	}
	if (this.x <= 0) {
		this.x = 0;
	}
	// In the Y axes
	if (this.y >= 380) {
		this.y = 380;
	}
	// The plyer reached the water
	if (this.y <= -20) {
		upGradeLevel();
	}

};

Player.prototype.handleInput = function (keyPress) {
	const UP = 'up';
	const DOWN = 'down';
	const RIGHT = 'right';
	const LEFT = 'left';

	switch (keyPress) {
		case UP:
			this.y -= this.speed - 20;
			break;
		case DOWN:
			this.y += this.speed - 20;
			break;
		case RIGHT:
			this.x += this.speed;
			break;
		case LEFT:
			this.x -= this.speed;
			break;
	}
};

function createRandomEnemies(count) {
	const yPossitions = [60, 140, 220];
	let randomX;
	let randomY;
	for (let i = count; i >= 1; i--) {
		// randomX = (Math.floor(Math.random() * 3) * 100);
		randomX = Math.floor(Math.random() * count) * 100;
		randomY = Math.floor(Math.random() * 3);
		allEnemies.push(new Enemy(randomX, yPossitions[randomY % yPossitions.length], 200));
	}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
const player = new Player(PLAYER_INIT_X, PLAYER_INIT_Y);
let level = 1;

function initGame() {
    player.init();
    createRandomEnemies(level);
}

function upGradeLevel() {
    level++;
    allEnemies = [];
    initGame();
}

function gameOver() {
    level = 1;
    allEnemies = [];
    initGame();
}



// Start the game
initGame();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
