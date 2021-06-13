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
can.width = ScreenSizeW*3;
can.height = ScreenSizeH*3;

const chImg = new Image();
chImg.src = "sprite.png";
let startTime;
let frameCount = 0;

let ojisan = new Ojisan(100,100);
let field = new Field();
let block = [];
let item = [];

window.onload =()=>{
    startTime = performance.now();
    mainLoop();
}

function drawSprite(snum, x, y){
    let sprite_X = (snum%16)*16;
    let sprite_Y = (snum>>4)<<4;
    vcon.drawImage(chImg,sprite_X,sprite_Y,16,32, x, y,16,32);
}
function updateObj(obj){
    for (let i = obj.length-1; i>=0; i--) {
        obj[i].update();
        if(obj[i].kill)obj.splice(i,1);
    }
}
function update(){
    field.update();
    updateObj(block);
    updateObj(item);
    ojisan.update();
    
}
function drawObj(obj){
    for (let i = obj.length-1; i>=0; i--) {
        obj[i].draw();
    }
}
function draw() {
    vcon.fillStyle = 'skyblue';
    vcon.fillRect(0,0,ScreenSizeW,ScreenSizeH);
    field.draw();
    drawObj(block);
    drawObj(item);
    ojisan.draw();
    vcon.fillStyle = 'white';
    vcon.font = '24px'
    vcon.fillText("Frame:"+frameCount,0,20);
    con.drawImage(vcan,0,0,vcan.width,vcan.height, 0,0,can.width,can.height);
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
    if(e.key == 's')field.scrollX--;
    if(e.key == 'd')field.scrollX++;
}
document.onkeyup=(e)=>{
    if(e.key == 'j')keyLeft = false;
    if(e.key == 'l')keyRight = false;
    if(e.key == 'i')keyUp = false;
    if(e.key == 'k')keyLeft = false;
}