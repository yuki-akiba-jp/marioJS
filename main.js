const GameFPS = 1000/60;
const ScreenSizeW = 256;
const ScreenSizeH = 224;

let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");
vcan.width = ScreenSizeW;
vcan.height = ScreenSizeH;
vcon.mozimageSmoothingEnabled = false;
vcon.msimageSmoothingEnabled = false;
vcon.webkitimageSmoothingEnabled = false;
vcon.imageSmoothingEnabled = false;



let can = document.querySelector("#can");
let con = can.getContext("2d");
can.width = ScreenSizeW*2;
can.height = ScreenSizeH*2;

const chImg = new Image();
chImg.src = "sprite.png";
chImg.onload = draw;
let startTime;
let frameCount = 0;
let snum = 0;
let oji_x = 100<<4;
let oji_y = 150<<4;
let oji_vx = 0<<4;
let oji_vy = 0<<4;
window.onload =()=>{
    mainLoop();
    startTime = performance.now();
}

function drawSprite(snum, x, y){
    let sprite_X = (snum%16)*16;
    let sprite_Y = (snum>>4)<<4;

    vcon.drawImage(chImg,sprite_X,sprite_Y,16,32, x, y,16,32);
}

function draw() {
    vcon.fillStyle = 'skyblue';
    vcon.fillRect(0,0,ScreenSizeW,ScreenSizeH);

    vcon.fillStyle = 'white';
    vcon.font = '24px'
    vcon.fillText("Frame:"+frameCount,0,20);
    drawSprite(snum,oji_x>>4,oji_y>>4);
    con.drawImage(vcan,0,0,vcan.width,vcan.height, 0,0,can.width,can.height);
}
let vx_speed =(2<<5);
let update_count = 0;
let grabity = 2<<3;
function update(){
    update_count++;
    if(keyLeft){
        snum = 50+(update_count>>3)%3;
        if(oji_vx>-vx_speed)oji_vx-=vx_speed;
    }else if(keyRight){
        snum = 2+(update_count>>3)%3;
        if(oji_vx<vx_speed)oji_vx+=vx_speed;
    }else{
        if(oji_vx>0)oji_vx-=vx_speed;
        if(oji_vx<0)oji_vx+=vx_speed;
        if(oji_vx == 0)snum = 0;
    }
    if(keyUp){
        if(oji_vy<32)oji_vy-=grabity;
    }
    oji_x+=oji_vx;
    oji_y+=oji_vy;
}

function mainLoop(){
    let nowTime = performance.now();
    let nowFrame = (nowTime - startTime)/GameFPS;
    if (nowFrame>frameCount) {
        let c = 0;
        while(nowFrame>frameCount){
        frameCount++;
        update();
        if(c++>=4)break;
        }
    }
    draw();

    requestAnimationFrame(mainLoop);
}
let keyLeft=false,keyRight = false,keyUp = false,keyDown = false;
document.onkeydown=(e)=>{
    if(e.key == 'j')keyLeft = true;
    if(e.key == 'l')keyRight = true;
    if(e.key == 'i')keyUp = true;
    if(e.key == 'k')keyLeft = true;
}
document.onkeyup=(e)=>{
    if(e.key == 'j')keyLeft = false;
    if(e.key == 'l')keyRight = false;
    if(e.key == 'i')keyUp = false;
    if(e.key == 'k')keyLeft = false;
}