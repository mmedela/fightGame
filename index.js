import playerSprite from "./js/classes/playerSprite.js";
import Sprite from "./js/classes/Sprite.js";
const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const keys = {
    // LATERAL MOVEMENTS
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    },
    // VERTICAL MOVEMENTS
    w:{
        pressed: false
    },
    ArrowUp:{
        pressed: false
    }
};

canvasContext.fillRect(0,0, canvas.width, canvas.height);

const background = new Sprite({
    position:{x:0, y:0}, 
    imgSrc:'./imgs/background_layer_1.jpeg'}
);

const backgroundAnimation = new Sprite({
    position:{x:600, y:208}, 
    imgSrc:'./imgs/shop_anim.png',
    scale: 2.5,
    totalFrames: 6
});

const player1 = new playerSprite({
    position:{
        x:0,
        y:0
    },
    velocity:{
        x:0,
        y:0
    },
    imgSrc:'./character animations/knight/_Idle.png',
    totalFrames: 10,
    scale: 3.5,
    offset:{
        x:140,
        y: 130
    },
    framesHold: 4,
    sprites:{
        idle: {
            imgSrc:'./character animations/knight/_Idle.png',
            totalFrames: 10,
            framesHold: 4
        },
        run: {
            imgSrc:'./character animations/knight/_Run.png',
            totalFrames: 10,
            framesHold: 4
        },
        jump: {
            imgSrc:'./character animations/knight/_Jump.png',
            totalFrames: 3,
            framesHold: 4
        },
        fall: {
            imgSrc:'./character animations/knight/_Fall.png',
            totalFrames: 3,
            framesHold: 4
        },
        attack2: {
            imgSrc:'./character animations/knight/_Attack2.png',
            totalFrames: 6,
            framesHold:10,
            framesHold: 6
        },
        getHit: {
            imgSrc:'./character animations/knight/_Hit.png',
            totalFrames: 2,
            framesHold: 12
        },
        death: {
            imgSrc:'./character animations/knight/_Death.png',
            totalFrames: 10,
            framesHold: 10
        }
    },
    attackBox:{
        offset:{
            x:100,
            y:60
        },
        width:140,
        height:50
    }
});

const player2 = new playerSprite({
    position:{
        x:600,
        y:100
    },
    velocity:{
        x:0,
        y:0
    },
    imgSrc:'./character animations/samurai/Idle.png',
    totalFrames: 4,
    scale: 2.5,
    offset:{
        x:220,
        y: 170
    },
    framesHold: 10,
    sprites:{
        idle: {
            imgSrc:'./character animations/samurai/Idle.png',
            totalFrames: 4,
            framesHold: 10
        },
        run: {
            imgSrc:'./character animations/samurai/Run.png',
            totalFrames: 8,
            framesHold: 0
        },
        jump: {
            imgSrc:'./character animations/samurai/Jump.png',
            totalFrames: 2,
            framesHold: 10
        },
        fall: {
            imgSrc:'./character animations/samurai/Fall.png',
            totalFrames: 2,
            framesHold: 10
        },
        attack2: {
            imgSrc:'./character animations/samurai/Attack1.png',
            totalFrames: 4,
            framesHold: 7
        },
        getHit: {
            imgSrc:'./character animations/samurai/Take hit.png',
            totalFrames: 3,
            framesHold: 5
        },
        death: {
            imgSrc:'./character animations/samurai/Death.png',
            totalFrames: 7,
            framesHold: 10
        }
    },
    attackBox:{
        offset:{
            x:-200,
            y:50
        },
        width:175,
        height:50
    }
});
var time = 99;

function showGameOverMessage(player1, player2, timerId){
    clearTimeout(timerId);
    let message = document.querySelector('#gameOverMessage');
    message.style.display = 'flex';
    if(player1.currentHealth() === player2.currentHealth()){
        message.innerText = 'Tie';
    }else if(player1.currentHealth() > player2.currentHealth()){
        message.innerText = 'Player 1 wins';
    }else{
        message.innerText = 'Player 2 wins';
    }
}
let timerId = 0;
function countDown(){
    if(time > 0){
        timerId = setTimeout(countDown, 1000);
        time--;
        document.querySelector('#timer').innerText = time;
    }else{
        showGameOverMessage(player1, player2, timerId);
    }
}
countDown();
function animate(){
    window.requestAnimationFrame(animate);
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0,0,canvas.width, canvas.height);
    
    background.update(canvasContext);
    backgroundAnimation.update(canvasContext);
    player1.update(canvasContext, canvas.height);
    player2.update(canvasContext, canvas.height);
    player1.stop();
    player2.stop();
    if(keys.a.pressed && player1.lastKeyPressed == 'a'){
        player1.velocity.x = -5;
        player1.switchAnimationTo('run');
    }else if(keys.d.pressed && player1.lastKeyPressed == 'd'){
        player1.velocity.x = 5;
        player1.switchAnimationTo('run');
    }else{
        player1.switchAnimationTo('idle');
        
    }

    if(player1.velocity.y < 0){
        player1.switchAnimationTo('jump');
    }
    if(player1.velocity.y > 0){
        player1.switchAnimationTo('fall');
    }

    if(keys.ArrowLeft.pressed && player2.lastKeyPressed == 'ArrowLeft'){
        player2.velocity.x = -5;
        player2.switchAnimationTo('run');
    }else if(keys.ArrowRight.pressed && player2.lastKeyPressed == 'ArrowRight'){
        player2.velocity.x = 5;
        player2.switchAnimationTo('run');
    }else{
        player2.switchAnimationTo('idle');
    }

    if(player2.velocity.y < 0){
        player2.switchAnimationTo('jump');
    }
    if(player2.velocity.y > 0){
        player2.switchAnimationTo('fall');
    }

    if(player1.canAttack(player2) && player1.isAttacking() && player1.currentFrame === 3){
        player1.stopAttack();
        player2.getHit();
        document.querySelector('#player2Health').style.width = player2.currentHealth() + '%';
    }

    if(player1.isAttacking() && player1.currentFrame === 3) player1.stopAttack();

    if(player2.canAttack(player1) && player2.isAttacking() && player2.currentFrame === 2){
        player2.stopAttack();
        player1.getHit();
        document.querySelector('#player1Health').style.width = player1.currentHealth() + '%';
    }

    if(player2.isAttacking() && player2.currentFrame === 2) player2.stopAttack();

    if(player1.isDead() || player2.isDead()){
        showGameOverMessage(player1, player2, timerId);
    }
}

animate();

window.addEventListener('keydown', (event)=>{
    if(player1.isDead() || player2.isDead()) return;
    switch(event.key){
        case 'd':
            keys.d.pressed = true;
            player1.lastKeyPressed = 'd';
            break;
        case 'a':
            keys.a.pressed = true;
            player1.lastKeyPressed = 'a';
            break;
        case 'w':
            player1.jump();
            break;
        case ' ':
            player1.attack();
            player1.switchAnimationTo('attack2');
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            player2.lastKeyPressed = 'ArrowRight';
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            player2.lastKeyPressed = 'ArrowLeft';
            break;
        case 'ArrowUp':
            player2.jump();
            break;
        case '0':
            player2.attack();
            player2.switchAnimationTo('attack2');
            break;
    }
});

window.addEventListener('keyup', (event)=>{
    
    switch(event.key){
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
});