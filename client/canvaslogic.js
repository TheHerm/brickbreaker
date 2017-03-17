
export const fillCanvas = function(){
  let canvas = document.getElementById('myCanvas');
  let ctx = canvas.getContext('2d');

  let xPos = canvas.width / 2;
  let yPos = canvas.height - 30;
  let xMov = -2;
  let yMov = -2;
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
    drawBall();
    xPos += xMov;
    yPos += yMov;
    if((yPos-ballRadius+2) + yMov < 0 || (yPos+ballRadius-2) + yMov > canvas.height) yMov = -yMov;
    if((xPos-ballRadius+2) + xMov < 0 || (xPos+ballRadius-2) + xMov > canvas.width) xMov = -xMov;
  }

  setInterval(draw, (1000 / 60));

}