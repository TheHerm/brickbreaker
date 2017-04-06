
export const FillCanvas = function(){
  this.canvas = document.getElementById('myCanvas');
  this.ctx = this.canvas.getContext('2d');
  this.xPos = this.canvas.width / 2;
  this.yPos = this.canvas.height - 30;
  this.xMov = 1;
  this.yMov = -1;
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
    top: new Array(21),
    left: new Array(21),
    right: new Array(21),
    bottom: new Array(21),
    topLeft: [],
    topRight: [],
    bottomRight: [],
    bottomLeft: []
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
    this.animate();
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
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fillText("Lives: " + this.lives, this.canvas.width-65, 20);
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

    let sides = Object.keys(this.edges);
    if(this.edges[sides[0]][0]){
      for(let i=0; i<sides.length; i++){
        for(let j=0; j<this.edges[sides[i]].length; j++){
          this.ctx.beginPath();
          this.ctx.rect(this.edges[sides[i]][j][0], this.edges[sides[i]][j][1], 1, 1);
          this.ctx.fillStyle = 'black';
          this.ctx.fill();
          this.ctx.closePath();
        }
      }
    }
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
    this.drawBricks();
    this.drawPaddle();
  }
  this.animate = function(){
    if(this.endGame){
      return;
    }else if(!this.endGame) {
      this.draw();
      requestAnimationFrame(this.animate);
    }
    this.collisionDetection();
    // this.wallCollisionDetection();
    // this.bottomAndPaddleCollisionDetection();
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
            this.xMov = 1;
            this.yMov = -1;
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
          console.log('*********', sides[i]);
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
    let xTransformLeft = x - (this.ballRadius / 2);
    let xTransformRight = x + (this.ballRadius / 2);
    let yTransformDown = y + (this.ballRadius / 2);
    let yTransformUp = y - (this.ballRadius / 2);
    this.edges.topLeft[0] = [xTransformLeft, yTransformUp];
    this.edges.bottomLeft[0] = [xTransformLeft, yTransformDown];
    this.edges.bottomRight[0] = [xTransformRight, yTransformDown];
    this.edges.topRight[0] = [xTransformRight, yTransformUp];

    for(let i = -3; i<3; i++){
      this.edges.bottom[i+3] = [(x+i), ( y+(this.ballRadius-2) )];
      this.edges.bottom[i+8] = [(x+i), ( y+(this.ballRadius-3) )];
      this.edges.bottom[i+13] = [(x+i), ( y+(this.ballRadius-4) )];

      this.edges.top[i+3] = [(x+i), ( y-(this.ballRadius-2) )];
      this.edges.top[i+8] = [(x+i), ( y-(this.ballRadius-3) )];
      this.edges.top[i+13] = [(x+i), ( y-(this.ballRadius-4) )];

      this.edges.right[i+3] = [( x+(this.ballRadius-2) ), (y+i)];
      this.edges.right[i+8] = [( x+(this.ballRadius-3) ), (y+i)];
      this.edges.right[i+13] = [( x+(this.ballRadius-4) ), (y+i)];

      this.edges.left[i+3] = [( x-(this.ballRadius-2) ), (y+i)];
      this.edges.left[i+8] = [( x-(this.ballRadius-3) ), (y+i)];
      this.edges.left[i+13] = [( x-(this.ballRadius-4) ), (y+i)];
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