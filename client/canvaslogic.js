
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
  let score = 0;
  let lives = 3;

  for(let c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }

  function drawBricks() {
    for(let c=0; c<brickColumnCount; c++) {
      for(let r=0; r<brickRowCount; r++) {
        if(!bricks[c][r].status) continue;
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

  function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth/2;
    }
  }

  function collisionDetection() {
    for(let c=0; c<brickColumnCount; c++) {
      for(let r=0; r<brickRowCount; r++) {
        var b = bricks[c][r];
        if(b.status && xPos > b.x && xPos < b.x+brickWidth && yPos > b.y && yPos < b.y+brickHeight) {
          yMov = -yMov;
          b.status = 0;
          score++;
          if(score == brickRowCount*brickColumnCount) {
            alert("YOU WIN, CONGRATULATIONS!");
            document.location.reload();
          }
        }
      }
    }
  }

  function drawScore() {
    ctx.beginPath();
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
    ctx.closePath();
  }

  function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
  }

  let draw = function() {
    xPos += xMov;
    yPos += yMov;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScore();
    drawLives();
    drawBricks();
    drawBall();
    drawPaddle();
    if((xPos-ballRadius+2) + xMov < 0 || (xPos+ballRadius-2) + xMov > canvas.width)   xMov = -xMov;
    if((yPos-ballRadius+2) + yMov < 0)   yMov = -yMov;
    if((yPos+ballRadius-2) > canvas.height) {
      if(xPos > paddleX && xPos < paddleX + paddleWidth)   yMov = -yMov;
      else {
        lives--;
        if(!lives) {
          alert("GAME OVER");
          document.location.reload();
        }else {
          xPos = canvas.width/2;
          yPos = canvas.height-30;
          xMov = 5;
          yMov = -5;
          paddleX = (canvas.width-paddleWidth)/2;
        }
      }
    }
    collisionDetection();
    if(rightPressed && paddleX < canvas.width-paddleWidth)   paddleX += 7;
    else if(leftPressed && paddleX > 0)   paddleX -= 7;
    requestAnimationFrame(draw);
  }

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  document.addEventListener("mousemove", mouseMoveHandler, false);

  draw();

}