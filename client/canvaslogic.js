
export const FillCanvas = function(){
  this.canvas = document.getElementById('myCanvas');
  this.ctx = this.canvas.getContext('2d');
  this.xPos = this.canvas.width / 2;
  this.yPos = this.canvas.height - 30;
  this.xMov = 3;
  this.yMov = -3;
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
  this.edges = {
    left: new Array(21).fill([]),
    right: new Array(21).fill([]),
    bottom: new Array(21).fill([]),
    top: new Array(21).fill([]),
    topLeft: new Array(3).fill([]),
    topRight: new Array(3).fill([]),
    bottomRight: new Array(3).fill([]),
    bottomLeft: new Array(3).fill([])
  };
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
    this.setBallPixelArray(this.xPos, this.yPos);
    this.animate();
  }
  this.setBallPixelArray = function(x, y){
    let xTransformLeft = x - (1+this.ballRadius / 2);
    let xTransformRight = x + (1+this.ballRadius / 2);
    let yTransformDown = y + (1+this.ballRadius / 2);
    let yTransformUp = y - (1+this.ballRadius / 2);
    this.edges.topLeft[0] = [xTransformLeft-1, yTransformUp+1];
    this.edges.topLeft[1] = [xTransformLeft, yTransformUp];
    this.edges.topLeft[2] = [xTransformLeft+1, yTransformUp-1];

    this.edges.bottomLeft[0] = [xTransformLeft-1, yTransformDown-1];
    this.edges.bottomLeft[1] = [xTransformLeft, yTransformDown];
    this.edges.bottomLeft[2] = [xTransformLeft+1, yTransformDown+1];

    this.edges.bottomRight[0] = [xTransformRight+1, yTransformDown-1];
    this.edges.bottomRight[1] = [xTransformRight, yTransformDown];
    this.edges.bottomRight[2] = [xTransformRight-1, yTransformDown+1];

    this.edges.topRight[0] = [xTransformRight-1, yTransformUp-1];
    this.edges.topRight[1] = [xTransformRight, yTransformUp];
    this.edges.topRight[2] = [xTransformRight+1, yTransformUp+1];

    for(let i = -3; i<4; i++){
      this.edges.bottom[i+3] = [(x+i), ( y+(this.ballRadius-2) )];
      this.edges.bottom[i+10] = [(x+i), ( y+(this.ballRadius-3) )];
      this.edges.bottom[i+17] = [(x+i), ( y+(this.ballRadius-4) )];

      this.edges.top[i+3] = [(x+i), ( y-(this.ballRadius-2) )];
      this.edges.top[i+10] = [(x+i), ( y-(this.ballRadius-3) )];
      this.edges.top[i+17] = [(x+i), ( y-(this.ballRadius-4) )];

      this.edges.right[i+3] = [( x+(this.ballRadius-2) ), (y+i)];
      this.edges.right[i+10] = [( x+(this.ballRadius-3) ), (y+i)];
      this.edges.right[i+17] = [( x+(this.ballRadius-4) ), (y+i)];

      this.edges.left[i+3] = [( x-(this.ballRadius-2) ), (y+i)];
      this.edges.left[i+10] = [( x-(this.ballRadius-3) ), (y+i)];
      this.edges.left[i+17] = [( x-(this.ballRadius-4) ), (y+i)];
    }
  }
  this.stopGame = function(){
    this.endGame = true;
  }
  this.mouseMoveHandler = function(e) {
    let relativeX = e.clientX - this.canvas.offsetLeft;
    if(relativeX > 0 && relativeX < this.canvas.width) {
      this.paddleX = relativeX - this.paddleWidth/2;
    }
  }
  this.drawLives = function() {
    this.ctx.beginPath();
    this.ctx.rect(this.canvas.width-70, 0, 70, 20);
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Lives: " + this.lives, this.canvas.width-62, 16);
    this.ctx.closePath();
  }
  this.drawScore = function() {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, 75, 20);
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Score: " + this.score, 5, 16);
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

    // let sides = Object.keys(this.edges);
    // if(this.edges[sides[0]][0]){
    //   for(let i=0; i<sides.length; i++){
    //     for(let j=0; j<this.edges[sides[i]].length; j++){
    //       this.ctx.beginPath();
    //       this.ctx.rect(this.edges[sides[i]][j][0], this.edges[sides[i]][j][1], 1, 1);
          
    //       if(sides[i]=='top') this.ctx.fillStyle = 'black';
    //       if(sides[i]=='right') this.ctx.fillStyle = 'red';
    //       if(sides[i]=='bottom') this.ctx.fillStyle = 'blue';
    //       if(sides[i]=='left') this.ctx.fillStyle = 'green';
    //       if(sides[i]=='topLeft') this.ctx.fillStyle = 'white';
    //       if(sides[i]=='topRight') this.ctx.fillStyle = 'orange';
    //       if(sides[i]=='bottomLeft') this.ctx.fillStyle = 'yellow';
    //       if(sides[i]=='bottomRight') this.ctx.fillStyle = 'grey';
    //       this.ctx.fill();
    //       this.ctx.closePath();
    //     }
    //   }
    // }
  }
  this.drawPaddle = function() {
    this.ctx.beginPath();
    this.ctx.rect(this.paddleX, this.canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fill();
    this.ctx.closePath();
  }
  this.draw = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.xPos += this.xMov;
    this.yPos += this.yMov;
    this.drawScore();
    this.drawLives();
    this.drawBall();
    this.drawPaddle();
    this.drawBricks();
  }
  this.animate = function(){
    if(this.endGame){
      return;
    }else if(!this.endGame) {
      this.draw();
      this.collisionDetection();
      requestAnimationFrame(this.animate);
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
  this.removeBrick = function(coord){
    let brick;
    for(let c=0; c<this.brickColumnCount; c++) {
      for(let r=0; r<this.brickRowCount; r++) {
        brick = this.bricks[c][r];
        if(brick.status && coord[0] >= brick.x && coord[0] <= brick.x+this.brickWidth && coord[1] >= brick.y && coord[1] <= brick.y+this.brickHeight){
          brick.status = 0;
          this.score++;
          this.checkEnd();
          return;
        }
      }
    }
  }

  this.collisionDetection = function() {
    this.findCircleEdges(this.xPos, this.yPos);
    let edges = this.checkCircleEdgesForCollision()
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
        case 'right': {
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
        case 'sideWall': {
          this.xMov = -this.xMov;
          break;
        }
        case 'topWall': {
          this.yMov = -this.yMov;
          break;
        }
        case 'bottomWall': {
          this.lives--;
          this.checkEnd();
          if(this.lives){
            this.xPos = this.canvas.width / 2;
            this.yPos = this.canvas.height-30;
            this.setBallPixelArray(this.xPos, this.yPos)
            this.xMov = 2;
            this.yMov = -2;
            this.paddleX = (this.canvas.width-this.paddleWidth) / 2;
          }
          break;
        }
        default:
          break;
      }
    }
    return;
  }

  this.checkCircleEdgesForCollision = function(){
    let sides = Object.keys(this.edges);
    for(let i=0; i<sides.length; i++){
      for(let j=0; j<this.edges[sides[i]].length; j++){
        if(!this.edges[sides[i]][j][0]) continue;
        if(this.edges[sides[i]][j][0]<=0 || this.edges[sides[i]][j][0]>=this.canvas.width){
          return {
            bounceSide: "sideWall",
            coord: this.edges[sides[i]][j]
          }
        }else if(this.edges[sides[i]][j][1]<=0){
          return {
            bounceSide: "topWall",
            coord: this.edges[sides[i]][j]
          }
        }else if(this.edges[sides[i]][j][1]>=this.canvas.height){
          return {
            bounceSide: "bottomWall",
            coord: this.edges[sides[i]][j]
          }
        }else if(this.ctx.getImageData(this.edges[sides[i]][j][0], this.edges[sides[i]][j][1], 1, 1).data[3] !== 252){
          console.log('*********', sides[i], this.edges[sides[i]][j][0], this.edges[sides[i]][j][1]);
          return {
            bounceSide: sides[i] + "",
            coord: this.edges[sides[i]][j]
          }
        }
      }
    }
    return null;
  }

  this.findCircleEdges = function(x, y){
    for(let i=0; i<this.edges.top.length; i++){
      this.edges.top[i][0] += this.xMov;
      this.edges.right[i][0] += this.xMov;
      this.edges.left[i][0] += this.xMov;
      this.edges.bottom[i][0] += this.xMov;
      this.edges.top[i][1] += this.yMov;
      this.edges.right[i][1] += this.yMov;
      this.edges.left[i][1] += this.yMov;
      this.edges.bottom[i][1] += this.yMov;
      if(i>2) continue;
      this.edges.topRight[i][1] += this.yMov;
      this.edges.topLeft[i][1] += this.yMov;
      this.edges.bottomRight[i][1] += this.yMov;
      this.edges.bottomLeft[i][1] += this.yMov;
      this.edges.topRight[i][0] += this.xMov;
      this.edges.topLeft[i][0] += this.xMov;
      this.edges.bottomLeft[i][0] += this.xMov;
      this.edges.bottomRight[i][0] += this.xMov;
    }
    
  }

  this.draw = this.draw.bind(this);
  this.animate = this.animate.bind(this);
  this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
  this.collisionDetection = this.collisionDetection.bind(this);
  this.drawBricks = this.drawBricks.bind(this);
  this.drawBall = this.drawBall.bind(this);
  this.findCircleEdges = this.findCircleEdges.bind(this);
  this.checkCircleEdgesForCollision = this.checkCircleEdgesForCollision.bind(this);
}

  // this.keyDownHandler = this.keyDownHandler.bind(this);
  // this.keyUpHandler = this.keyUpHandler.bind(this);

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