
export const fillCanvas = function(){
  let canvas = document.getElementById('myCanvas');
  let ctx = canvas.getContext('2d');

  let xPos = canvas.width / 2;
  let yPos = canvas.height - 30;
  let xMov = -5;
  let yMov = -5;
  let ballRadius = 10;
  let paddleHeight = 10;
  let paddleWidth = 75;
  let paddleX = (canvas.width-paddleWidth)/2;
  let rightPressed = false;
  let leftPressed = false;
  let brickRowCount = 3;
  let brickColumnCount = 5;
  let brickWidth = 75;
  let brickHeight = 20;
  let brickPadding = 10;
  let brickOffsetTop = 30;
  let brickOffsetLeft = 30;
  let bricks = [];
  for(let c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 };
    }
  }

  function drawBricks() {
    for(let c=0; c<brickColumnCount; c++) {
      for(let r=0; r<brickRowCount; r++) {
        let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
        let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }

  let drawBall = function(){
    ctx.beginPath();
    ctx.arc(xPos, yPos, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
  }

  let draw = function() {
    xPos += xMov;
    yPos += yMov;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    if((xPos-ballRadius+2) + xMov < 0 || (xPos+ballRadius-2) + xMov > canvas.width)   xMov = -xMov;
    if((yPos-ballRadius+2) + yMov < 0)   yMov = -yMov;
    if((yPos+ballRadius-2) > canvas.height) {
      if(xPos > paddleX && xPos < paddleX + paddleWidth)   yMov = -yMov;
      else {
        alert("GAME OVER");
        clearInterval(frameInterval);
        return;
      }
    }
    if(rightPressed && paddleX < canvas.width-paddleWidth)   paddleX += 7;
    else if(leftPressed && paddleX > 0)   paddleX -= 7;
  }

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  let frameInterval = setInterval(draw, (1000 / 60));

}