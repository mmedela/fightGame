class Sprite{
    constructor({position, imgSrc, scale = 1, totalFrames = 1, offset={x:0, y:0}, framesHold = 8}){
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.img = new Image();
        this.img.src = imgSrc;
        this.scale = scale;
        this.totalFrames = totalFrames;
        this.currentFrame = 0;
        this.framesElapsed = 0;
        this.offset = offset;
        this.framesHold = framesHold;
    }

    draw(canvasContext){
        canvasContext.drawImage(
            this.img,
            this.currentFrame * this.img.width / this.totalFrames,
            0,
            this.img.width/this.totalFrames,
            this.img.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.img.width / this.totalFrames) * this.scale,
            this.img.height * this.scale
        );
    }

    trackAnimationFrames(){
        this.framesElapsed++;
        if(this.framesElapsed % this.framesHold === 0){
         if(this.currentFrame < this.totalFrames-1) this.currentFrame++;
         else this.currentFrame = 0;
        } 
    }

    update(canvasContext){
       this.draw(canvasContext);
      this.trackAnimationFrames();
    }
}

export default Sprite;