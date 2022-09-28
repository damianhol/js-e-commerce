const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const collisionCanvas = document.getElementById('collisionCanvas');
const collisionCtx = collisionCanvas.getContext('2d');
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

let score = 0;
let gameOver = false;
ctx.font = '50px Impact';

//timeToNextBall nalicza czas az dojdzie do czasu okreslonego w BallInterval i dopiero wtedy przejdzie na nastepna klatke
let timeToNextBall = 0;
let ballInterval = 500;
// lasttime ma w sobie timestamp z ostatniego loop
let lasttime = 0;


let balls = [];
class Ball{
    constructor(){
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.sizeModifier = Math.random() * 0.2 + 0.4;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = canvas.width;
        // this.height zostalo dodane, zeby kulki nie spamowaly sie na dole ekranu
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 5 + 3;
        this.directionY = Math.random() * 5 - 2;
        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src = 'img/game/ball.png';
        this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';
    }
    update(){
        this.x -= this.directionX;
        if (this.x < 0 - this.width) this.markedForDeletion = true;
        if(this.x < 0 - this.width) gameOver = true;
    }
    draw(){
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.width, this.height);    
        ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

let explosions = [];
class Explosion {
    constructor(x, y, size){
        this.image = new Image();
        this.image.src = ('img/game/boom.png');
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.size = size;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.timer = 0;
        this.markedForDeletion = false;
    }
    update(){
        this.timer++;
        if (this.timer % 10 === 0){
            this.frame++;
        }
    }
    draw(){
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.size, this.size);
    }
}

function drawScore(){
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 80, 85);
  
}

function drawPromo(){
    ctx.fillAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.fillText('Congrats, your coupon code is "PROMO", your score: ' + score, 50, 200);
  
}

function drawGameOver() {
    ctx.fillAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.fillText('Game Over fella, your score: ' + score, 50, 260);
}

window.addEventListener('click', function(e){
    
    const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);
    //console.log(detectPixelColor);
    const pc = detectPixelColor.data;
    balls.forEach(object => {
        if (object.randomColors[0] === pc[0] && object.randomColors[1] === pc[1] && object.randomColors[2] === pc[2]){
            object.markedForDeletion = true;
            score++;
            explosions.push(new Explosion(object.x, object.y, object.width));
        }
    });
})


function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
    // timestamp z nowego loop minus timestamp z ostatniego loop
    let deltatime = timestamp - lasttime;
    lasttime = timestamp;
    timeToNextBall += deltatime;
    if (timeToNextBall > ballInterval){
        balls.push(new Ball());
        timeToNextBall = 0;
        balls.sort(function(a,b){
            return a.width - b.width;
        });
    };
    drawScore();
    [...balls, ...explosions].forEach(object => object.update());
    [...balls, ...explosions].forEach(object => object.draw());
    //usuwanie starych klatek
    balls = balls.filter(object => !object.markedForDeletion);
    explosions = explosions.filter(object => !object.markedForDeletion);
    if (!gameOver) requestAnimationFrame(animate)
    else drawGameOver();
    if (score > 20) drawPromo();
}
animate(0);