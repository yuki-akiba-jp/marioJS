class Item extends Sprite{
    checkFloor(){
        if(this.vy<=0)return;
        let lx = this.x>>4;
        let ly = (this.y+this.vy)>>4;
        if(field.isBlock(lx+1,ly+15)|| field.isBlock(lx+14,ly+15)){
            this.vy = 0;
            this.y = ((((ly+15)>>4)<<4)-16)<<4;
        }
    }
    checkWall(){
        let lx = (this.x+this.vx)>>4;
        let ly = (this.y+this.vy)>>4;
        if(field.isBlock(lx+15,ly+3)|| field.isBlock(lx+14,ly+12)||field.isBlock(lx,ly+3)|| field.isBlock(lx,ly+12))
        {
            this.vx *= -1 ;
        }
    }
    update(){
        if(this.kill)return;
        if(checkHit(ojisan,this)){
            ojisan.kinoko = 1;
            this.kill = true;
            return;
        }

        if(++this.count<=16){
            this.y -= (1<<4);
            if(this.count == 16)this.vx =24;
            return;
        }
        this.checkFloor();
        this.checkWall();
        super.update();
    }
}