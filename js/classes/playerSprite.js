import Sprite from "./Sprite.js";

const gravity = 0.7;
class playerSprite extends Sprite{ 
    constructor({position, velocity, color = 'red', imgSrc, scale = 1, totalFrames = 1, 
                offset={x:0, y:0}, framesHold, sprites, attackBox}){
        super({position, imgSrc, scale, totalFrames, offset, framesHold});
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.lastKeyPressed;
        this.attacking = false;
        this.attackBox = {
            position:{
                x: this.position.x,
                y: this.position.y
            },
            width: attackBox.width,
            height: attackBox.height,
            offset: attackBox.offset
        }
        this.color = color;
        this.health = 100;
        this.currentFrame = 0;
        this.framesElapsed = 0;
        this.sprites = sprites;

        for(const sprite in this.sprites){
            sprites[sprite].img = new Image();
            sprites[sprite].img.src = sprites[sprite].imgSrc;
        }
        this.isAlive = true;
    }

    update(canvasContext, height){
        this.draw(canvasContext);
        if(this.isAlive) this.trackAnimationFrames();
        /*canvasContext.fillRect(this.attackBox.position.x, this.attackBox.position.y,
            this.attackBox.width, this.attackBox.height);*/
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        if(this.position.y + this.height + this.velocity.y >= height - 51){
            this.position.y = 375;
            this.velocity.y = 0;
        }else{
            this.velocity.y += gravity;
        }
    }

    canAttack(enemy){
        let a = this.attackBox.position.x + this.attackBox.width >= enemy.position.x;
        let b = this.attackBox.position.x <= enemy.position.x + enemy.width;
        let c = this.attackBox.position.y + this.attackBox.height >= enemy.position.y;
        let d = this.attackBox.position.y <= enemy.position.y + enemy.height;
        return a&&b&&c&&d;
    }

    isAttacking(){
        return this.attacking;
    }

    attack(){
        this.attacking = true;
    }
    stopAttack(){
        this.attacking = false;
    }

    getHit(){
        this.health -= 10;
        if(this.isDead()) this.switchAnimationTo('death');
        else this.switchAnimationTo('getHit');
    }

    isDead(){
        return (this.health <= 0);
    }

    currentHealth(){
        return this.health;
    }

    jump(){

        if(this.velocity.y === 0)this.velocity.y = -20;
    }

    stop(){
        this.velocity.x = 0;
    }

    switchAnimationTo (sprite) {
        if(this.img === this.sprites.death.img) {
            if(this.currentFrame === this.sprites.death.totalFrames - 1) this.isAlive = false;
            return;
        }
        if(this.img === this.sprites.attack2.img && this.currentFrame < this.sprites.attack2.totalFrames-1) return;
        if(this.img === this.sprites.getHit.img && this.currentFrame < this.sprites.getHit.totalFrames-1) return;
        switch (sprite) {
            case 'idle':
                if(this.img !== this.sprites.idle.img){
                    this.img = this.sprites.idle.img;
                    this.totalFrames = this.sprites.idle.totalFrames;
                    this.currentFrame = 0;
                    this.framesHold = this.sprites.idle.framesHold;
                }
                break;
            case 'run':
                if(this.img !== this.sprites.run.img){
                    this.img = this.sprites.run.img;
                    this.totalFrames = this.sprites.run.totalFrames;
                    this.currentFrame = 0;
                }
                break;
             case 'jump':
                if(this.img !== this.sprites.jump.img){
                    this.img = this.sprites.jump.img;
                    this.totalFrames = this.sprites.jump.totalFrames;
                    this.currentFrame = 0;
                }
                break;
            case 'fall':
                if(this.img !== this.sprites.fall.img){
                    this.img = this.sprites.fall.img;
                    this.totalFrames = this.sprites.fall.totalFrames;
                    this.currentFrame = 0;
                }
                break;
            case 'attack2':
                if(this.img !== this.sprites.attack2.img){
                    this.img = this.sprites.attack2.img;
                    this.totalFrames = this.sprites.attack2.totalFrames;
                    this.currentFrame = 0;
                    this.framesHold = this.sprites.attack2.framesHold;
                }
                break;
            case 'getHit':
                if(this.img !== this.sprites.getHit.img){
                    this.img = this.sprites.getHit.img;
                    this.totalFrames = this.sprites.getHit.totalFrames;
                    this.currentFrame = 0;
                    this.framesHold = this.sprites.getHit.framesHold;
                }
                break;
            case 'death':
                if(this.img !== this.sprites.death.img){
                    this.img = this.sprites.death.img;
                    this.totalFrames = this.sprites.death.totalFrames;
                    this.currentFrame = 0;
                    this.framesHold = this.sprites.death.framesHold;
                }
                break;
            default:
                break;
        }
    }
}

export default playerSprite;