const ScreenSizeW = 256;
const ScreenSizeH = 224;




let can = document.querySelector("#can");
let con = can.getContext("2d");
con.fillStyle = 'skyblue';
con.fillRect(0,0,ScreenSizeW,ScreenSizeH);

const chImg = new Image();
chImg.src = "sprite.png";
chImg.onload = draw;

function draw() {
    con.drawImage(chImg,32,0,16,32, 0,0,32,64);
}