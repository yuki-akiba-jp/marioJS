const Stand = 1;
const Walk = 2;
const Brake = 4;
const JUMP = 8;
const grabity = 4;
const maxSpeed = 32;
const Left = 1;
const Right = 0;
const typeMini = 16;
const typebig = 2;
const typeFire = 4;


class Ojisan{
    constructor(x,y) {
        this.x = x<<4;
        this.y = y<<4;
        this.ay = 16;
        this.w = 16;
        this.h = 16;
        this.vx = 0;
        this.vy = 0;
        this.anim = 0;
        this.snum = 0;
        this.acou = 0;
        this.dirc = 0;
        this.jump = 0;
        this.kinoko = 0;
        this.type = typeMini;
    }
    checkFloor(){
        if(this.vy<=0)return;
        let lx = this.x>>4;
        let ly = (this.y+this.vy)>>4;
        if(field.isBlock(lx+1,ly+31)|| field.isBlock(lx+14,ly+31)){
            if(this.anim == JUMP)this.anim = Walk;
            this.jump = 0;
            this.vy = 0;
            this.y = ((((ly+31)>>4)<<4)-32)<<4;
        }
    }
    checkWall(){
        let lx = (this.x+this.vx)>>4;
        let ly = (this.y+this.vy)>>4;
        if(field.isBlock(lx+15,ly+9)|| field.isBlock(lx+15,ly+15)||field.isBlock(lx+14,ly+24)){
            this.vx = 0;
            this.x -= 8;
        }else if(field.isBlock(lx,ly+9)|| field.isBlock(lx,ly+15)||field.isBlock(lx,ly+24)){
            this.vx = 0;
            this.x += 8;
        }
    }
    checkCeil(){
        if(this.vy>=0)return;
        let lx = (this.x+this.vx)>>4;
        let ly = (this.y+this.vy)>>4;
        let bl;
        let x = (lx+8)>>4;
        let y = (ly+6)>>4;
        if(bl = field.isBlock(lx+8,ly+6)){
            this.jump = 15;
            this.vy = 0;
        if(bl!=371){
            block.push(new Block(bl,x,y));
            item.push(new Item(218,x,y,0,0));
        }else if(this.type == typeMini)block.push(new Block(bl,x,y));
        else{
        block.push(new Block(bl,x,y,1,20,-60));
        block.push(new Block(bl,x,y,1,-20,-60));
        block.push(new Block(bl,x,y,1,20,-20));
        block.push(new Block(bl,x,y,1,-20,-20));
        }
        }
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
            case JUMP:
                this.snum = 6;
                break;
                    }
            if(this.dirc)this.snum +=48;
            if(this.type == typeMini)this.snum +=32;

    }

    update(){
        if(this.kinoko){
            let anim = [32,14,32,14,32,14,0,32,14,0];
            this.snum = anim[this.kinoko>>2];
            if(this.snum == 32)this.h =16;
            else this.h = 32;
            if(this.dirc)this.snum+=48;
            if(++this.kinoko == 40){
                this.type = typebig;
                this.ay = 0;
                this.kinoko = 0;
            }
            return;
        }

        this.acou++;
        if(Math.abs(this.vx) == maxSpeed)this.acou++;
        this.updateJump();
        this.updateWalk();
        this.updateAnim();

        if(this.vy<64)this.vy+=grabity;
        this.x += this.vx;
        this.y += this.vy;

       this.checkWall();
       this.checkFloor();
       this.checkCeil();
    }
    draw(){
        let px = (this.x>>4) - field.scrollX;
        let py = (this.y>>4) - field.scrollY;
        let w = this.w;
        let h = this.h;
        let sprite_X = (this.snum%16)*16;
        let sprite_Y = (this.snum>>4)<<4;
        py += (32-h);
        vcon.drawImage(chImg,sprite_X,sprite_Y,this.w,this.h, px, py,w,h);
    }
}