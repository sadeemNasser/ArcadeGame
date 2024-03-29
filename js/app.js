// Enemies our player must avoid

class Enemy{
    constructor(x, y, speed){
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks


     update(dt){
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // when off canvas, reset position of enemy to move across again
    if (this.x > 550) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 256);
    }

    // Check for collision between player and enemies
    if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        player.x = 200;
        player.y = 380;
        player.collision+=1;
        if(player.score!=0){
          player.score-=10;
        }}
    }//end update function
    // Draw the enemy on the screen, required method for game

     render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }//end render function
}//end class enemy



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x,y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
    this.score=0;
    this.collision=0;
    this.heart='<img class="hearts" src="images/Heart.png"/>';

  }
  update(){

    rating();
    if (this.y > 380) {
        this.y = 380;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    if(this.collision>=15){
      this.isOver();
    }

    // Check for player reaching top of canvas
    if (this.y <= 0) {
        this.x = 200;
        this.y = 380;
        this.score+=100;

    }
  }//end update function
    render(){
       ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }//end render function
    handleInput(keyPress){
        switch (keyPress) {
            case 'left':
                this.x -= this.speed + 50;
                break;
            case 'up':
                this.y -= this.speed + 30;
                break;
            case 'right':
                this.x += this.speed + 50;
                break;
            case 'down':
                this.y += this.speed + 30;
                break;
        }       
    }//end handleInput function 
    isOver(){
        alert('hard luck :( \n score : '+ this.score +'\n collision : '+this.collision);
        player = new Player(200, 380, 50);
    }//end isOver
}//end class Player



function rating() {
  if( player.collision < 5) {
      hearts=player.heart+player.heart+player.heart;
  } else if( player.collision  < 10) {
      hearts=player.heart+player.heart;
  } else {
      hearts=player.heart;
  }
  document.getElementById('score').innerHTML = player.score;
  document.getElementById('hearts').innerHTML =hearts;
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemyPosition = [60, 140, 220];
var player = new Player(200, 380, 50);
var enemy;
var hearts;
enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});

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
