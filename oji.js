const Stand = 1;
const Walk = 2;
const Brake = 4;
const JUMP = 8;
const grabity = 4;
const maxSpeed = 32;
const Left = 1;
const Right = 0;

class Ojisan{
    constructor(x,y) {
        this.x = x<<4;
        this.y = y<<4;
        this.vx = 0;
        this.vy = 0;
        this.anim = 0;
        this.snum = 0;
        this.acou = 0;
        this.dirc = 0;
        this.jump = 0;
    }
    checkFloor(){

    }

    updateJump(){
        if(keyUp){
            if(this.jump == 0){
                this.anim = JUMP;
                this.jump = 1
            }
            if(this.jump<15)this.vy = -(64-this.jump);
        }
        if(this.jump)this.jump++;
    }
    updateWalkSub(dir){
        if(dir == 0&& this.vx < maxSpeed)this.vx++;
        if(dir == 1 && this.vx > -maxSpeed)this.vx--;

        if(!this.jump){
            if(this.anim == Stand)this.acou = 0;
            this.anim = Walk;
            this.dirc = dir;
        if(dir == 0 && this.vx < 0)this.vx++;
        if(dir == 1 && this.vx > 0)this.vx--;
        if(dir == 1 && this.vx>8 ||dir == 0 && this.vx<-8)this.anim = Brake;
        }
    }
    updateWalk(){
        if(keyLeft)this.updateWalkSub(Left);
        else if(keyRight)this.updateWalkSub(Right);
        else {
            if(!this.jump){
                if(this.vx>0)this.vx -=1;
                if(this.vx<0)this.vx +=1;
                if(!this.vx)this.anim = Stand;
            }
        }
    }
    updateAnim(){
        switch (this.anim) {
            case Stand:
                this.snum = 0;
                break;
            case Walk:
                this.snum = 2+((this.acou>>3)%3);
                break;
            case Brake:
                this.snum = 5;
                break;
        }
        if(this.dirc && !this.jump)this.snum +=48;
    }

    update(){
        this.acou++;
        if(Math.abs(this.vx) == maxSpeed)this.acou++;
        this.updateJump();
        this.updateWalk();
        this.updateAnim();

        if(this.vy<64)this.vy+=grabity;
        this.x += this.vx;
        this.y += this.vy;

        if(this.y > 160<<4){
            if(this.anim == JUMP)this.anim=Walk;
            this.jump = 0;
            this.vy = 0;
            this.y = 160<<4;
        }
    }
    draw(){
        let px = (this.x>>4) - field.scrollX;
        let py = (this.y>>4) - field.scrollY;
        drawSprite(this.snum,px,py);
    }
}