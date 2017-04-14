import {Brick} from './bricks.jsx';

export const FillCanvas = function(){

/*---------------- VARIABLES ----------------- */

  this.canvas = document.getElementById('myCanvas');
  this.ctx = this.canvas.getContext('2d');
  this.xPos = this.canvas.width / 2;
  this.yPos = this.canvas.height - 70;
  this.xMov = 4;
  this.yMov = -4;
  this.i = 0;
  this.j = 0;
  this.loopLen = 0;
  this.ballRadius = 12;
  this.paddleHeight = 38;
  this.paddleWidth = 120;
  this.paddleX = (this.canvas.width - this.paddleWidth) / 2;
  this.rightPressed = false;
  this.leftPressed = false;
  this.brickCount = 30;
  // this.brickRowCount = 3;
  // this.brickColumnCount = 12;
  // this.brickWidth = 70;
  // this.brickHeight = 25;
  // this.brickPadding = 5;
  // this.brickOffsetTop = 50;
  // this.brickOffsetLeft = 47;
  this.bricks = new Array(this.brickCount).fill({dead: true});
  this.score = 0;
  this.lives = 3;
  this.endGame = false;
  this.edges = {
    left: new Array(19).fill([]),
    right: new Array(19).fill([]),
    bottom: new Array(19).fill([]),
    top: new Array(19).fill([]),
    topLeft: new Array(3).fill([]),
    topRight: new Array(3).fill([]),
    bottomRight: new Array(3).fill([]),
    bottomLeft: new Array(3).fill([])
  };

/*---------------- FUNCTIONS ----------------- */

    /*--- START STOP SETUP STATS --- */

  this.startGame = function(){
    if(this.endGame == false){
      // document.addEventListener("keydown", this.keyDownHandler, false);
      // document.addEventListener("keyup", this.keyUpHandler, false);
      document.addEventListener("mousemove", this.mouseMoveHandler, false);
      this.setBallPixelArray(this.xPos, this.yPos);
      this.createBricks();
      this.animate();
    }else {
      this.endGame = false;
      this.animate();
    }
  }
  this.stopGame = function(){
    this.endGame = true;
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
  this.mouseMoveHandler = function(e) {
    let relativeX = e.clientX - this.canvas.offsetLeft;
    if(relativeX > 0 && relativeX < this.canvas.width) {
      this.paddleX = relativeX - this.paddleWidth/2;
    }
  }
  this.setBallPixelArray = function(x, y){
    let xTransformLeft = x - (this.ballRadius / 2 - 1);
    let xTransformRight = x + (this.ballRadius / 2 - 1);
    let yTransformDown = y + (this.ballRadius / 2 - 1);
    let yTransformUp = y - (this.ballRadius / 2 - 1);
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

    for(let i = -4; i<5; i++){
      this.edges.bottom[i+4] = [(x+i), ( y+(this.ballRadius-4) )];
      // this.edges.bottom[i+10] = [(x+i), ( y+(this.ballRadius-3) )];
      // this.edges.bottom[i+17] = [(x+i), ( y+(this.ballRadius-4) )];

      this.edges.top[i+4] = [(x+i), ( y-(this.ballRadius-4) )];
      // this.edges.top[i+10] = [(x+i), ( y-(this.ballRadius-3) )];
      // this.edges.top[i+17] = [(x+i), ( y-(this.ballRadius-4) )];

      this.edges.right[i+4] = [( x+(this.ballRadius-4) ), (y+i)];
      // this.edges.right[i+10] = [( x+(this.ballRadius-3) ), (y+i)];
      // this.edges.right[i+17] = [( x+(this.ballRadius-4) ), (y+i)];

      this.edges.left[i+4] = [( x-(this.ballRadius-4) ), (y+i)];
      // this.edges.left[i+10] = [( x-(this.ballRadius-3) ), (y+i)];
      // this.edges.left[i+17] = [( x-(this.ballRadius-4) ), (y+i)];

      if(i>=-2 && i<=2){
        this.edges.bottom[i+14] = [(x+i), ( y+(this.ballRadius-3) )];
        this.edges.top[i+14] = [(x+i), ( y-(this.ballRadius-3) )];
        this.edges.right[i+14] = [( x+(this.ballRadius-3) ), (y+i)];
        this.edges.left[i+14] = [( x-(this.ballRadius-3) ), (y+i)];
      }
    }
  }
  this.createBricks = function(){
    for(this.i = 1; this.i<=this.brickCount; this.i++){
      this.bricks[this.i] = new Brick(this.i);
      this.bricks[this.i].setInitialPos(this.canvas.width, this.canvas.height / 2);
    }
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

    /*--- DRAW --- */
  
  this.draw = function() {
    let drawing = new Image() 
    drawing.src = "spacebackground.jpg" 
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(drawing, -1, -1, 1002, 652);
    this.xPos += this.xMov;
    this.yPos += this.yMov;
    this.drawScore();
    this.drawLives();
    this.drawBall();
    this.drawPaddle();
    this.drawBricks();
  }
  this.drawLives = function() {
    this.ctx.beginPath();
    this.ctx.rect(this.canvas.width-70, 0, 70, 20);
    this.ctx.fillStyle = "#1ba1e2";
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
    this.ctx.fillStyle = "#1ba1e2";
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Score: " + this.score, 5, 16);
    this.ctx.closePath();
  }
  this.drawBricks = function() {
    this.loopLen = this.bricks.length;
    for(this.i = 0; this.i<this.loopLen; this.i++) {
      if(this.bricks[this.i].dead) continue;
      this.bricks[this.i].stepForward();
      this.bricks[this.i].drawBrick(this.ctx);
    }
  }
  this.drawBall = function(){
    this.ctx.beginPath();
    this.ctx.arc(Math.round(this.xPos), Math.round(this.yPos), this.ballRadius, 0, Math.PI*2);
    this.ctx.fillStyle = '#60a917';
    this.ctx.fill();
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
    let drawing = new Image() 
    drawing.src = "Spaceship2.png" 
    this.ctx.drawImage(drawing, this.paddleX, this.canvas.height - this.paddleHeight, this.paddleWidth,this.paddleHeight);
  }
  
    /*--- COLLISION --- */
  
  
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
  this.bounce = function(str){
    if(str[0] === 'x'){
      this.xMov = -this.xMov;
      this.xPos += this.xMov;
      this.yPos += this.yMov;
      // this.xPos += (Math.abs(this.xMov) + 2) * str.slice(1);
    }else if(str[0] === 'y'){
      this.yMov = -this.yMov;
      this.yPos += this.yMov;
      this.xPos += this.xMov;      
      // this.yPos += (Math.abs(this.yMov) + 2) * str.slice(1);
    }else if(str[0] === 'z'){
      this.yMov = -this.yMov;
      this.xMov = -this.xMov;
      this.xPos += this.xMov;      
      this.yPos += this.yMov;
    }else if(str[0] === 'p'){
      this.xPos += this.xMov;      
      this.yPos += this.yMov;
      // this.yPos += (Math.abs(this.yMov) + 2) * str.slice(1);
    }
    this.setBallPixelArray(this.xPos, this.yPos);
  }
  this.collisionDetection = function() {
    this.moveCircleEdges(this.xPos, this.yPos);
    let edges = this.checkCircleEdgesForCollision()
    if(edges){
      console.log(edges.bounceSide)
      switch(edges.bounceSide){
        case 'top': {
          this.bounce('y');
          this.removeBrick(edges.coord);
          break;
        }
        case 'bottom': {
          this.bounce('y');
          this.removeBrick(edges.coord);
          break;
        }
        case 'left': {
          this.bounce('x');
          this.removeBrick(edges.coord);
          break;
        }
        case 'right': {
          this.bounce('x');
          this.removeBrick(edges.coord);
          break;
        }
        case 'topLeft': {
          this.bounce('z');
          this.removeBrick(edges.coord);
          break;
        }
        case 'topRight': {
          this.bounce('z');
          this.removeBrick(edges.coord);
          break;
        }
        case 'bottomLeft': {
          this.bounce('z');
          this.removeBrick(edges.coord);
          break;
        }
        case 'bottomRight': {
          this.bounce('z');
          this.removeBrick(edges.coord);
          break;
        }
        case 'sideWall': {
          this.bounce('x');
          break;
        }
        case 'topWall': {
          this.bounce('y');
          break;
        }
        case 'paddle': {
          this.paddleRebound(edges.coord[0]);
          this.bounce('p');
          break;
        }
        case 'bottomWall': {
          this.lives--;
          this.checkEnd();
          if(this.lives){
            this.xPos = this.canvas.width / 2;
            this.yPos = this.canvas.height-70;
            this.setBallPixelArray(this.xPos, this.yPos)
            this.xMov = 3;
            this.yMov = -(Math.abs(this.yMov) * .80);
          }
          break;
        }
        default:
          break;
      }
    }
    return;
  }
  this.paddleRebound = function(xCoord){
    let paddlePercent = (xCoord - this.paddleX) / this.paddleWidth;
    let incommingX = this.xMov;

    if(paddlePercent >= .50){
      paddlePercent = (2 * paddlePercent) - 1 + Math.pow(paddlePercent, 2);
      this.xMov = incommingX + paddlePercent;
      this.yMov = -(Math.abs(this.yMov) + .1);
    }else{
      paddlePercent = 1 - paddlePercent;
      paddlePercent = (2 * paddlePercent) - 1 + Math.pow(paddlePercent, 2);
      this.xMov = incommingX - paddlePercent;
      this.yMov = -(Math.abs(this.yMov) + .1);
    }
  }
  this.checkCircleEdgesForCollision = function(){
    // if( (this.yPos < this.canvas.height - this.paddleHeight*2 && this.yPos > this.actionHeight) 
    //   && (this.xPos > 30 && this.xPos < this.canvas.width-30) )   return;
    let sides = Object.keys(this.edges);
    let len, i, j, x, y, colorData;
    // this.ctx.beginPath();
    // this.ctx.rect(this.xPos, this.yPos, 1, 1);
    // this.ctx.fillStyle = 'white';
    // this.ctx.fill();
    // this.ctx.closePath();
    for(i=0; i<sides.length; i++){
      len = this.edges[sides[i]].length;
      for(j=0; j<len; j++){
        x = Math.round(this.edges[sides[i]][j][0]);
        y = Math.round(this.edges[sides[i]][j][1]);
        if(!x){
          continue;
        }else if(x<=0 || x>=this.canvas.width){
          return {
            bounceSide: "sideWall",
            coord: [x, y]
          }
        }else if(y<=0){
          return {
            bounceSide: "topWall",
            coord: [x, y]
          }

        }else if(y>=this.canvas.height){
          return {
            bounceSide: "bottomWall",
            coord: [x, y]
          }
        }
        colorData = this.ctx.getImageData(x, y, 1, 1).data;
        if(typeof colorData[0] == 'number' && colorData[0] !== 96 && colorData[1] !==  169 && colorData[2] !== 23) {
          colorData = [];
          if(y>=this.canvas.height-this.paddleHeight*2){
            return {
              bounceSide: "paddle",
              coord: [x, y]
            }
          }else{
            return {
              bounceSide: sides[i] + "",
              coord: [x, y]
            }
          }

        }
      }
    }
    return null;
  }
  this.moveCircleEdges = function(x, y){
    for(let i=0; i<this.edges.top.length; i++){
      this.edges.top[i][0] += this.xMov;
      this.edges.right[i][0] += this.xMov;
      this.edges.left[i][0] += this.xMov;
      this.edges.bottom[i][0] += this.xMov;
      this.edges.top[i][1] += this.yMov;
      this.edges.right[i][1] += this.yMov;
      this.edges.left[i][1] += this.yMov;
      this.edges.bottom[i][1] += this.yMov;
      if(i >= this.edges.topRight.length) continue;
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

  /*---------------- BINDINGS ----------------- */
  
  this.draw = this.draw.bind(this);
  this.animate = this.animate.bind(this);
  this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
  this.collisionDetection = this.collisionDetection.bind(this);
  this.drawBricks = this.drawBricks.bind(this);
  this.drawBall = this.drawBall.bind(this);
  this.moveCircleEdges = this.moveCircleEdges.bind(this);
  this.checkCircleEdgesForCollision = this.checkCircleEdgesForCollision.bind(this);
  this.bounce = this.bounce.bind(this);
}

  /*-------------------- NOTES ------------------------------- */


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