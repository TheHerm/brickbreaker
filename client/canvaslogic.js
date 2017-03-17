
export const fillCanvas = function(){
  let canvas = document.getElementById('myCanvas');
  let ctx = canvas.getContext('2d');

  let xPos = canvas.width/2;
  let yPos = canvas.height-30;
  let xMov = -5;
  let yMov = -5;
  let ballRadius = 10;

  let drawBall = function(){
    ctx.beginPath();
    ctx.arc(xPos, yPos, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  let draw = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(yPos + yMov < 0) yMov = -yMov;
    if(yPos + yMov > canvas.height) yMov = -yMov;
    if(xPos + xMov < 0) xMov = -xMov;
    if(xPos + xMov > canvas.width) xMov = -xMov;
    drawBall();
    xPos += xMov;
    yPos += yMov;
  }

  setInterval(draw, (1000 / 60));

}