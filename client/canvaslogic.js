
export const FillCanvas = function(){
  this.canvas = document.getElementById('myCanvas');
  this.ctx = this.canvas.getContext('2d');
  this.xPos = this.canvas.width / 2;
  this.yPos = this.canvas.height - 30;
  this.xMov = 2;
  this.yMov = -2;
  this.ballRadius = 10;
  this.paddleHeight = 10;
  this.paddleWidth = 75;
  this.paddleX = (this.canvas.width - this.paddleWidth) / 2;
  this.rightPressed = false;
  this.leftPressed = false;
  this.brickRowCount = 3;
  this.brickColumnCount = 7;
  this.brickWidth = 50;
  this.brickHeight = 50;
  this.brickPadding = 30;
  this.brickOffsetTop = 100;
  this.brickOffsetLeft = 70;
  this.bricks = [];
  this.score = 0;
  this.lives = 3;
  this.endGame = false;

  this.startGame = function(){
    for(let c=0; c<this.brickColumnCount; c++) {
      this.bricks[c] = [];
      for(let r=0; r<this.brickRowCount; r++) {
        this.bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
    // document.addEventListener("keydown", this.keyDownHandler, false);
    // document.addEventListener("keyup", this.keyUpHandler, false);
    document.addEventListener("mousemove", this.mouseMoveHandler, false);
    this.animate();
  }

  this.drawScore = function() {
    this.ctx.beginPath();
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fillText("Score: " + this.score, 8, 20);
    this.ctx.closePath();
  }

  this.drawBricks = function() {
    let count = 0;
    for(let c=0; c<this.brickColumnCount; c++) {
      for(let r=0; r<this.brickRowCount; r++) {
        this.bricks[c][r].num = ++count;
        if(!this.bricks[c][r].status) continue;
        let brickX = (c*(this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
        let brickY = (r*(this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
        this.bricks[c][r].x = brickX;
        this.bricks[c][r].y = brickY;
        this.ctx.beginPath();
        this.ctx.rect(this.bricks[c][r].x, this.bricks[c][r].y, this.brickWidth, this.brickHeight);
        this.ctx.fillStyle = "black";
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fillText(this.bricks[c][r].num, brickX+20, brickY+20);
        this.ctx.closePath();
      }
    }
  }

  this.drawBall = function(){
    this.ctx.beginPath();
    this.ctx.arc(this.xPos, this.yPos, this.ballRadius, 0, Math.PI*2);
    this.ctx.globalAlpha=.99;
    this.ctx.fillStyle = '#0095DD';
    this.ctx.fill();
    this.ctx.globalAlpha=1;    
    this.ctx.closePath();
  }

  this.drawPaddle = function() {
    this.ctx.beginPath();
    this.ctx.rect(this.paddleX, this.canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fill();
    this.ctx.closePath();
  }


  this.mouseMoveHandler = function(e) {
    let relativeX = e.clientX - this.canvas.offsetLeft;
    if(relativeX > 0 && relativeX < this.canvas.width) {
      this.paddleX = relativeX - this.paddleWidth/2;
    }
  }

  this.wallCollisionDetection = function(){
    if((this.xPos-this.ballRadius+2) + this.xMov < 0 
        || (this.xPos+this.ballRadius-2) + this.xMov > this.canvas.width){
          this.xMov = -this.xMov;
    }
    if((this.yPos-this.ballRadius+2) + this.yMov < 0){
      this.yMov = -this.yMov;
    }
  }

  this.checkEnd = function(){
    if(this.score == this.brickRowCount*this.brickColumnCount) {
      this.endGame = true;
      alert("YOU WIN, CONGRATULATIONS!");
      document.location.reload();
    }else if(!this.lives) {
      this.endGame = true;
      alert("GAME OVER");
      document.location.reload();
    }
  }

  this.brickCollisionDetection = function() {
    let edges = this.findCircleEdges(this.xPos, this.yPos);
    console.log(edges)
    edges = this.checkCircleEdgesForCollision(edges)
    if(edges){
      switch(edges.bounceSide){
        case 'top': {
          this.yMov = -this.yMov;
          this.removeBrick(edges.coord);
          break;
        }
        case 'bottom': {
          this.yMov = -this.yMov;
          this.removeBrick(edges.coord);
          break;
        }
        case 'left': {
          this.xMov = -this.xMov;
          this.removeBrick(edges.coord);
          break;
        }
        case 'left': {
          this.xMov = -this.xMov;
          this.removeBrick(edges.coord);
          break;
        }
        case 'topLeft': {
          this.yMov = -this.yMov;
          this.xMov = -this.xMov;
          this.removeBrick(edges.coord);
          break;
        }
        case 'topRight': {
          this.xMov = -this.xMov;
          this.yMov = -this.yMov;
          this.removeBrick(edges.coord);
          break;
        }
        case 'bottomLeft': {
          this.xMov = -this.xMov;
          this.yMov = -this.yMov;
          this.removeBrick(edges.coord);
          break;
        }
        case 'bottomRight': {
          this.xMov = -this.xMov;
          this.yMov = -this.yMov;
          this.removeBrick(edges.coord);
          break;
        }
        default:
          break;
      }
    }
    return;
  }

  this.removeBrick = function(coord){
    let brick;
    for(let c=0; c<this.brickColumnCount; c++) {
      for(let r=0; r<this.brickRowCount; r++) {
        brick = this.bricks[c][r];
        if(brick.status 
            && coord[0] >= brick.x && coord[0] <= brick.x+this.brickWidth
              && coord[1] >= brick.y && coord[1] <= brick.y+this.brickHeight){

              brick.status = 0;
              this.score++;
              this.checkEnd();
              return;
          }
      }
    }
  }

  this.checkCircleEdgesForCollision = function(edges){
    let sides = Object.keys(edges);
    for(let i=0; i<sides.length; i++){
      for(let j=0; j<5; j++){
        console.log(edges)
        if(this.ctx.getImageData(edges[sides[i]][j][0], edges[sides[i]][j][1], 1, 1).data[3] !== 252){
          console.log('*********')
          console.log(sides[i]);
          return {
            bounceSide: sides[i] + "",
            coord: edges[sides[i]][j]
          }
        }
      }
    }
    return null;
  }

  this.findCircleEdges = function(x, y){
    let pixel = [0,0]
    let yTransform, xTransform;
    let edges = {
      topLeft: new Array(3),
      top: new Array(7),
      topRight: new Array(3),
      right: new Array(7),
      bottomRight: new Array(3),
      bottom: new Array(7),
      bottomLeft: new Array(3),
      left: new Array(7)
    };
    for(let i = -3; i<4; i++){
      edges.bottom[i+3] = [(x+i), (y+this.ballRadius-1)];
      edges.top[i+3] = [(x+i), (y-this.ballRadius+1)];
      edges.right[i+3] = [(x+this.ballRadius-1), (y+i)];
      edges.left[i+3] = [(x-this.ballRadius+1), (y+i)];
      if(i<-1 || i>1) {
        yTransform = y - 2 + this.ballRadius / 2;
        xTransform = x - 2 + this.ballRadius / 2;
        edges.bottomRight[i+3] = [xTransform+i, yTransform-i];

        yTransform = y + 2 - this.ballRadius / 2;
        xTransform = x - 2 + this.ballRadius / 2;
        edges.topRight[i+3] = [xTransform+i, yTransform-i];
        
        yTransform = y + 2 - this.ballRadius / 2;
        xTransform = x + 2 - this.ballRadius / 2;
        edges.topLeft[i+3] = [xTransform+i, yTransform-i];
        
        yTransform = y - 2 + this.ballRadius / 2;
        xTransform = x + 2 - this.ballRadius / 2;
        edges.bottomLeft[i+3] = [xTransform+i, yTransform-i];
      }
      yTransform = y - 2 + this.ballRadius / 2;
      xTransform = x - 2 + this.ballRadius / 2;
      edges.bottomRight[i+3] = [xTransform+i, yTransform-i];

      yTransform = y + 2 - this.ballRadius / 2;
      xTransform = x - 2 + this.ballRadius / 2;
      edges.topRight[i+3] = [xTransform+i, yTransform-i];
      
      yTransform = y + 2 - this.ballRadius / 2;
      xTransform = x + 2 - this.ballRadius / 2;
      edges.topLeft[i+3] = [xTransform+i, yTransform-i];
      
      yTransform = y - 2 + this.ballRadius / 2;
      xTransform = x + 2 - this.ballRadius / 2;
      edges.bottomLeft[i+3] = [xTransform+i, yTransform-i];
    }
    console.log(edges);
    return edges;
  }

  this.bottomAndPaddleCollisionDetection = function(){
    if((this.yPos+this.ballRadius-2) > this.canvas.height) {
      if(this.xPos > this.paddleX && this.xPos < this.paddleX + this.paddleWidth)   this.yMov = -this.yMov;
      else {
        this.lives--;
        this.checkEnd();
        if(this.lives){
          this.xPos = this.canvas.width / 2;
          this.yPos = this.canvas.height-30;
          this.xMov = 5;
          this.yMov = -5;
          this.paddleX = (this.canvas.width-this.paddleWidth) / 2;
        }
      }
    }
  }


  this.drawLives = function() {
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fillText("Lives: " + this.lives, this.canvas.width-65, 20);
  }

  this.animate = function(){
    if(this.endGame){
      return;
    }else if(!this.endGame) {
      this.draw();
      requestAnimationFrame(this.animate);
    }
    this.brickCollisionDetection();
    // this.wallCollisionDetection();
    // this.bottomAndPaddleCollisionDetection();
  }

  this.draw = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.xPos += this.xMov;
    this.yPos += this.yMov;
    this.drawScore();
    this.drawLives();
    this.drawBall();
    this.drawBricks();
    this.drawPaddle();
  }

  this.stopGame = function(){
    this.endGame = true;
  }

  this.draw = this.draw.bind(this);
  this.animate = this.animate.bind(this);
  // this.keyDownHandler = this.keyDownHandler.bind(this);
  // this.keyUpHandler = this.keyUpHandler.bind(this);
  this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
  this.brickCollisionDetection = this.brickCollisionDetection.bind(this);
  this.drawBricks = this.drawBricks.bind(this);
  this.drawBall = this.drawBall.bind(this);
  this.findCircleEdges = this.findCircleEdges.bind(this);
  this.checkCircleEdgesForCollision = this.checkCircleEdgesForCollision.bind(this);
}


  // this.keyDownHandler = function(e) {
  //   if(e.keyCode == 39) {
  //     this.rightPressed = true;
  //   }
  //   else if(e.keyCode == 37) {
  //     this.leftPressed = true;
  //   }
  // }

  // this.keyUpHandler = function(e) {
  //   if(e.keyCode == 39) {
  //     this.rightPressed = false;
  //   }
  //   else if(e.keyCode == 37) {
  //     this.leftPressed = false;
  //   }
  // }