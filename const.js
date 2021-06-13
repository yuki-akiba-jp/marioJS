const GameFPS = 1000/60;
const ScreenSizeW = 256;
const ScreenSizeH = 224;

const mapsizeW = (ScreenSizeW>>4);
const mapsizeH = (ScreenSizeH>>4);

const fieldsizeW = 256;
const fieldsizeH = 14;

function checkHit(obj1, obj2){
    let left1 = (obj1.x>>4) +2;
    let right1 = left1+obj1.w -4;
    let top1 = (obj1.y>>4) +5;
    let bottom1 = top1+obj1.h -7;
    let left2 = (obj2.x>>4)+2;
    let right2 = left2+obj2.w -4;
    let top2 = (obj2.y>>4) +5;
    let bottom2 = top2+obj2.h-7;
    return (left1<=right2 && right1 >=left2&&top1<=bottom2&&bottom1>=top2);
}

class Sprite{
    constructor(sp,x,y,vx,vy) {
        this.sp = sp;
        this.y = y<<8;
        this.x = x<<8;
        this.w = 16;
        this.h = 16;
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