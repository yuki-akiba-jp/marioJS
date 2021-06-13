const GameFPS = 1000/60;
const ScreenSizeW = 256;
const ScreenSizeH = 224;

const mapsizeW = (ScreenSizeW>>4);
const mapsizeH = (ScreenSizeH>>4);

const fieldsizeW = 256;
const fieldsizeH = 14;

class Sprite{
    constructor(sp,x,y,vx,vy) {
        this.sp = sp;
        this.y = y<<8;
        this.x = x<<8;
        this.vx = vx;
        this.vy = vy;
        this.kill = false;
        this.count = 0;
    }
    update(){
        this.count++;
        if(this.vy <64)this.vy +=grabity;
        this.x +=this.vx;
        this.y +=this.vy;
        if((this.y>>4) > fieldsizeH*16)this.kill = true;
    }
    draw(){
        if(this.kill)return;

        let an = this.sp;
        let sx = (an%16)<<4;
        let sy = (an>>4)<<4;
        let px = (this.x>>4)-field.scrollX;
        let py = (this.y>>4)-field.scrollY;
        vcon.drawImage(chImg,sx,sy,16,16,px,py,16,16);
    }
}