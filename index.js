
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var heightRatio = 0.7;
var fps=100;
// console.log(screen.width)




canvas.width=window.innerWidth*0.45;
canvas.height = canvas.width * heightRatio;
if(window.innerWidth<=560){
  canvas.width=window.innerWidth;
  canvas.height = canvas.width * (heightRatio+0.1);
  fps=70
}


var gameScore=document.getElementById("gameScore");

var score = 0;

var x = Math.random()*(canvas.width-10)+10;

var y = Math.random()*(canvas.height-10)+10;

var dx = 2;
var dy = -dx;
var speedRate=0.4;
var ballRadius = 10;
if(window.innerWidth<=560){
  speedRate=0.2;
}

//for paddle

var paddleHeight = 10;
var paddleWidth = canvas.width*0.22;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleY = canvas.height - paddleHeight ;
var paddleSpeed = 5;

// for controlls

var rightPress = false;
var leftPress = false;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function increaseSpeed(){
  // console.log("hallo");
  dx<0?dx-=speedRate:dx+=speedRate;
  dy<0?dy-=speedRate:dy+=speedRate;
}

function drawPaddle() {
  if (rightPress == true) {
    paddleX += 5;
    if (paddleX + paddleWidth/2 >= canvas.width) {
      paddleX = canvas.width - paddleWidth/2;
    }
  }
  if (leftPress == true) {
    paddleX -= 5;
    if (paddleX <= -(paddleWidth/2)) {
      paddleX = -(paddleWidth/2);
    }
  }
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  }
  else if(y+dy >= canvas.height-ballRadius-paddleHeight){
    if(x+ballRadius>=paddleX-5 && x-ballRadius<=paddleX+5+paddleWidth &&y+dy < canvas.height-ballRadius-paddleHeight+10){
      score++;
      gameScore.textContent=`${score}`;
      dy=-dy;
    }
    else if (y+ballRadius > canvas.height){
      // console.log(y+ballRadius,canvas.height);
      alert("Game Over");
      document.location.reload();
      clearInterval(interval);
    }
  }
  x += dx;
  y += dy;
  
}

function handleKeyDown(e) {

  if (e.key == "ArrowRight") {
    rightPress = true;
  } else if (e.key == "ArrowLeft") {
    leftPress = true;
  }
}

function handleKeyUp(e) {
  if (e.key == "ArrowRight") {
    rightPress = false;
  } else if (e.key == "ArrowLeft") {
    leftPress = false;
  }
}



function handleChange(e){
  paddleX=canvas.width*((this.value)/100)-(paddleWidth/2);
}






document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

document.getElementById("range").addEventListener("input",handleChange);


var interval = setInterval(draw, 1000/fps);


function periodicSpeedInc(){
  for (let i=0;i<10;i++){
    setTimeout(increaseSpeed,2000)
  }
  
}

periodicSpeedInc();

setInterval(periodicSpeedInc, 12000,2);
