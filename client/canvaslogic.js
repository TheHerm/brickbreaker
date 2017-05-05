import {Brick} from './bricks.jsx';
import {Bullet} from './bullets.jsx';

export const FillCanvas = function(){

/*---------------- VARIABLES ----------------- */

  this.canvas = document.getElementById('myCanvas');
  this.ctx = this.canvas.getContext('2d');
  this.background = new Image();
  this.xPos = this.canvas.width / 2;
  this.yPos = this.canvas.height - 70;
  this.xMov = 4;
  this.yMov = -4;
  this.i = 0;
  this.j = 0;
  this.loopLen = 0;
  this.brick = null;
  this.ballRadius = 12;
  this.paddleHeight = 38;
  this.paddleWidth = 120;
  this.paddleX = (this.canvas.width - this.paddleWidth) / 2;
  this.rightPressed = false;
  this.leftPressed = false;
  this.brickCount = 20;
  this.bricks = new Array(this.brickCount).fill({dead: true});
  this.enemyBullets = new Array(this.brickCount).fill(null);
  this.score = 0;
  this.lives = 3;
  this.endGame = false;
  this.paddleSprites = [[1,0]];
  this.sounds = new Array(5);
  this.edges = {
    left: new Array(1).fill([]),
    right: new Array(1).fill([]),
    bottom: new Array(1).fill([]),
    top: new Array(1).fill([]),
    topLeft: new Array(1).fill([]),
    topRight: new Array(1).fill([]),
    bottomRight: new Array(1).fill([]),
    bottomLeft: new Array(1).fill([])
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
      this.initializeSprites();
      this.background.src = "spacebackground.jpg";
      this.initializeSounds();
      this.sounds[3].pause();
      this.sounds[3].currentTime = 0;
      this.sounds[3].play();
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
    if(this.score == this.bricks.length) {
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

    // this.edges.topLeft[0] = [xTransformLeft-1, yTransformUp+1];
    this.edges.topLeft[0] = [xTransformLeft, yTransformUp];
    // this.edges.topLeft[2] = [xTransformLeft+1, yTransformUp-1];

    // this.edges.bottomLeft[0] = [xTransformLeft-1, yTransformDown-1];
    this.edges.bottomLeft[0] = [xTransformLeft, yTransformDown];
    // this.edges.bottomLeft[2] = [xTransformLeft+1, yTransformDown+1];

    // this.edges.bottomRight[0] = [xTransformRight+1, yTransformDown-1];
    this.edges.bottomRight[0] = [xTransformRight, yTransformDown];
    // this.edges.bottomRight[2] = [xTransformRight-1, yTransformDown+1];

    // this.edges.topRight[0] = [xTransformRight-1, yTransformUp-1];
    this.edges.topRight[0] = [xTransformRight, yTransformUp];
    // this.edges.topRight[2] = [xTransformRight+1, yTransformUp+1];

    // for(this.i = -4; this.i<5; this.i++){
      // this.edges.bottom[this.i+4] = [(x+this.i), ( y+(this.ballRadius-4) )];
      // this.edges.bottom[i+10] = [(x+i), ( y+(this.ballRadius-3) )];
      // this.edges.bottom[i+17] = [(x+i), ( y+(this.ballRadius-4) )];

      // this.edges.top[this.i+4] = [(x+this.i), ( y-(this.ballRadius-4) )];
      // this.edges.top[i+10] = [(x+i), ( y-(this.ballRadius-3) )];
      // this.edges.top[i+17] = [(x+i), ( y-(this.ballRadius-4) )];

      // this.edges.right[this.i+4] = [( x+(this.ballRadius-4) ), (y+this.i)];
      // this.edges.right[i+10] = [( x+(this.ballRadius-3) ), (y+i)];
      // this.edges.right[i+17] = [( x+(this.ballRadius-4) ), (y+i)];

      // this.edges.left[this.i+4] = [( x-(this.ballRadius-4) ), (y+this.i)];
      // this.edges.left[i+10] = [( x-(this.ballRadius-3) ), (y+i)];
      // this.edges.left[i+17] = [( x-(this.ballRadius-4) ), (y+i)];

      // if(this.i>=-2 && this.i<=2){
    this.edges.bottom[0] = [(x), ( y+(this.ballRadius-3) )];
    this.edges.top[0] = [(x), ( y-(this.ballRadius-3) )];
    this.edges.right[0] = [( x+(this.ballRadius-3) ), (y)];
    this.edges.left[0] = [( x-(this.ballRadius-3) ), (y)];
      // }
  }
  this.createBricks = function(){
    for(this.i = 0; this.i<this.brickCount; this.i++){
      this.bricks[this.i] = new Brick(this.i+1, this.canvas.height);
      this.bricks[this.i].setInitialPos(this.canvas.width, this.canvas.height / 2);
    }
  }
  this.animate = function(){
    if(this.endGame) return;
    this.draw();
    this.collisionDetection();
    requestAnimationFrame(this.animate);
  }
  this.initializeSprites = function(){
    for(this.i = 1; this.i<7; this.i++){
      this.paddleSprites[this.i] = new Image();
      this.paddleSprites[this.i].src = `Spaceship${this.i-1}.png`;
    }
  }
  this.initializeSounds = function(){
    this.sounds[0] = new Audio("bounce.mp3");
    this.sounds[0].playbackRate = 2;
    this.sounds[1] = new Audio("explosion.mp3");
    this.sounds[1].playbackRate = 1;
    this.sounds[1].volume = .2;
    this.sounds[2] = new Audio("laser.mp3");
    this.sounds[2].playbackRate = 1;
    this.sounds[2].volume = .1;
    this.sounds[3] = new Audio("start_noise.mp3");
    this.sounds[3].playbackRate = 1;
    this.sounds[4] = new Audio("paddle_bounce.mp3");
    this.sounds[4].playbackRate = 1;
  }

    /*--- DRAW --- */
  
  this.draw = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.background, -1, -1, this.canvas.width, this.canvas.height);
    this.xPos += this.xMov;
    this.yPos += this.yMov;
    this.drawBall();
    this.drawPaddle();
    this.drawBricksAndBullets();
  }
  this.drawBricksAndBullets = function() {
    this.loopLen = this.bricks.length;
    for(this.i = 0; this.i<this.loopLen; this.i++) {
      if(!this.bricks[this.i].dead){
        this.bricks[this.i].stepForward(this.xPos, this.yPos, this.paddleX);
        this.bricks[this.i].drawBrick(this.ctx);
      }
      this.drawBullets();
    }
  }
  this.drawBullets = function(){
    if(!this.enemyBullets[this.i] && !this.bricks[this.i].dead) {
      this.fireNewBullet();
      return;
    }else if(this.enemyBullets[this.i]){
      this.enemyBullets[this.i].stepForward();
      if(this.enemyBullets[this.i].y >= this.canvas.height){
        delete this.enemyBullets[this.i];
      }else {
        this.enemyBullets[this.i].drawBullet(this.ctx);
      }

    }
  }
  this.drawBall = function(){
    this.ctx.beginPath();
    this.ctx.arc(Math.round(this.xPos), Math.round(this.yPos), this.ballRadius, 0, Math.PI*2);
    this.ctx.fillStyle = 'rgb(69, 252, 2)';
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
    if(this.paddleSprites[0][1] > 5) {
      this.paddleSprites[0][0] = Math.round((Math.random() * 10000) % 5) + 1;
      this.paddleSprites[0][1] = 0;
    }else {
      this.paddleSprites[0][1]++;
    }
    this.ctx.drawImage(this.paddleSprites[this.paddleSprites[0][0]], this.paddleX, this.canvas.height - this.paddleHeight, this.paddleWidth,this.paddleHeight);
  }
  
    /*--- COLLISION --- */

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
          this.playSound(0);
          break;
        }
        case 'topWall': {
          this.bounce('y');
          this.playSound(0);
          break;
        }
        case 'paddle': {
          this.paddleRebound(edges.coord[0]);
          this.bounce('p');
          this.playSound(4);
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
            this.playSound(3);
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
    let x, y, colorData, len = sides.length;
    // this.ctx.beginPath();
    // this.ctx.rect(this.xPos, this.yPos, 1, 1);
    // this.ctx.fillStyle = 'white';
    // this.ctx.fill();
    // this.ctx.closePath();
    for(this.i=0; this.i<len; this.i++){
      this.loopLen = this.edges[sides[this.i]].length;
      for(this.j=0; this.j<this.loopLen; this.j++){
        x = Math.round(this.edges[sides[this.i]][this.j][0]);
        y = Math.round(this.edges[sides[this.i]][this.j][1]);
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
        if(colorData.toString() !== '69,252,2,255') {
          colorData = [];
          if(y>=this.canvas.height-this.paddleHeight*2){
            return {
              bounceSide: "paddle",
              coord: [x, y]
            }
          }else{
            return {
              bounceSide: sides[this.i] + "",
              coord: [x, y]
            }
          }

        }
      }
    }
    return null;
  }
  
  /*---------------- ACTIONS ----------------- */

  this.fireNewBullet = function(){
    if(Math.random() < .02){
      this.brick = this.bricks[this.i];
      this.enemyBullets[this.i] = new Bullet(this.brick.x, this.brick.y, this.paddleX, this.brick.width, this.brick.height, this.canvas.height);
      this.playSound(2);
    }
  }
  this.removeBrick = function(coord){
    this.loopLen = this.bricks.length
    for(this.i = 0; this.i<this.loopLen; this.i++) {
      if(this.bricks[this.i].dead) continue;
      if(this.bricks[this.i].checkCollision(coord[0], coord[1])){
        this.score++;
        this.playSound(1);
        this.checkEnd();
        return;
      }
    }
  }
  this.playSound = function(num){
    this.sounds[num].pause();
    this.sounds[num].currentTime = 0;
    this.sounds[num].play();
  }
  this.moveCircleEdges = function(x, y){
    this.loopLen = this.edges.top.length
    for(this.i=0; this.i<this.loopLen; this.i++){
      this.edges.top[this.i][0] += this.xMov;
      this.edges.right[this.i][0] += this.xMov;
      this.edges.left[this.i][0] += this.xMov;
      this.edges.bottom[this.i][0] += this.xMov;
      this.edges.top[this.i][1] += this.yMov;
      this.edges.right[this.i][1] += this.yMov;
      this.edges.left[this.i][1] += this.yMov;
      this.edges.bottom[this.i][1] += this.yMov;
      if(this.i >= this.edges.topRight.length) continue;
      this.edges.topRight[this.i][1] += this.yMov;
      this.edges.topLeft[this.i][1] += this.yMov;
      this.edges.bottomRight[this.i][1] += this.yMov;
      this.edges.bottomLeft[this.i][1] += this.yMov;
      this.edges.topRight[this.i][0] += this.xMov;
      this.edges.topLeft[this.i][0] += this.xMov;
      this.edges.bottomLeft[this.i][0] += this.xMov;
      this.edges.bottomRight[this.i][0] += this.xMov;
    }
  }

  /*---------------- BINDINGS ----------------- */
  
  this.draw = this.draw.bind(this);
  this.animate = this.animate.bind(this);
  this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
  this.collisionDetection = this.collisionDetection.bind(this);
  this.drawBricksAndBullets = this.drawBricksAndBullets.bind(this);
  this.drawBall = this.drawBall.bind(this);
  this.moveCircleEdges = this.moveCircleEdges.bind(this);
  this.checkCircleEdgesForCollision = this.checkCircleEdgesForCollision.bind(this);
  this.bounce = this.bounce.bind(this);
}

  /*-------------------- NOTES ------------------------------- */

// var snd = new Audio("file.wav"); // buffers automatically when created
// snd.play();

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