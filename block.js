class Block{
    constructor(bl,x,y,type,vx,vy) {
        if(type == undefined)type = 0;
        this.type = type;
        if(vx == undefined)vx = 0;
        this.vx = vx;
        if(vy == undefined)vy = 0;
        this.vy = vy;
        this.bl = bl;
        this.ox = x;
        this.oy = y;
        this.x = x<<8;
        this.y = y<<8;
        this.kill = false;
        this.count = 0;
        fieldData[y*fieldsizeW+x] =367;
    }
    update(){
        if(this.kill)return;
       

        this.count++;
        if(this.count ==10 && this.type == 0){
            this.kill = true;
        fieldData[this.oy*fieldsizeW+this.ox] =this.bl;
            return;
        }
        if(this.type ==0)return;
        if(this.vy <64)this.vy +=grabity;
        this.x +=this.vx;
        this.y +=this.vy;
        if((this.y>>4) > fieldsizeH*16)this.kill = true;
    }
    draw(){
        if(this.kill)return;

        let an;
        if(this.type == 0)an=this.bl;
        else an = 388+(frameCount>>5)%2;
        let sx = (an%16)<<4;
        let sy = (an>>4)<<4;
        let px = (this.x>>4)-field.scrollX;
        let py = (this.y>>4)-field.scrollY;

        if(this.type == 0){
        const anim =[0,1,2,3,4,3,2,1,0,-1];
        py -=anim[this.count];
    }
        vcon.drawImage(chImg,sx,sy,16,16,px,py,16,16);
    }
}