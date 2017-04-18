export  const Brick = function(id){

/* -------------- VARIABLES ----------------*/

  this.id = id;
  this.x = 0;
  this.y = 0;
  this.xMov = 50;
  this.yMov = 0;
  this.rowCount = 3;
  this.columnCount = 12;
  this.width = 50;
  this.height = 70;
  this.padding = 5;
  this.offsetTop = 50;
  this.offsetLeft = 47;
  this.dead = false;
  this.ballDist = 1000;
  this.paddleDist = 1000;
  this.moveDirectionLR = null;
  this.moveDirectionUD = null;
  this.personality = Math.random() + .1;
  this.activeWidth = [0,0];
  this.activeHeight = [0,0];
  this.xChange = 0;
  this.yChange = 0;
  this.initialX = 0;
  this.initialY = 0;
  this.distFromHome = 0;

/* -------------- FUNCTIONS ----------------*/

      /* --------- initialization ---------*/

  this.setInitialPos = function(width, height){
    this.activeHeight = [5, height];
    this.activeWidth = [this.width+this.width*.5*Math.random(), width-this.width+(Math.random()*this.width*.5)];
    this.initialX = Math.round((this.activeWidth[1] - 5) * Math.random() + 5);
    this.initialY = Math.round((this.activeHeight[1] - 5) * Math.random() + 5);
    this.x = this.initialX;
    this.y = this.initialY;
  }

      /* --------- frame change ---------*/
  this.setX = function(x = this.x){
    this.x = Math.round(x + this.xChange)
  }
  this.setY = function(y = this.y){
    this.y = Math.round(y + this.yChange)
  }
  this.getMoveDirections = function(x, y){
    if(x - this.x > 0) this.moveDirectionLR = -1;
    else this.moveDirectionLR = 1;
    if(y - this.y > 0) this.moveDirectionUD = -1;
    else this.moveDirectionUD = 1;
  }
  this.restrainXMovement = function(){
    if(this.x < this.activeWidth[0]){
      this.xChange = 0;
      this.setX(this.activeWidth[0] + 5);
      return true;
    }else if(this.x > this.activeWidth[1]){
      this.xChange = 0;
      this.setX(this.activeWidth[1] - 5);
      return true;
    }
  }
  this.restrainYMovement = function(){
    if(this.y < this.activeHeight[0]){
      this.yChange = 0;
      this.setY(this.activeHeight[0] + 5);
      return true;
    }else if(this.y > this.activeHeight[1]) {
      this.yChange = 0;
      this.setY(this.activeHeight[1] - 5);
      return true;
    }
  }
  this.stepForward = function(ballX, ballY, paddleX, paddleY){
    this.ballDist = Math.sqrt(Math.pow(ballX-this.x, 2)+Math.pow(ballY-this.y, 2));
    // this.paddleDist = Math.sqrt(Math.pow(paddleX-this.x, 2)+Math.pow(paddleY-this.y, 2));

    if(this.restrainXMovement()) return;
    if(this.restrainYMovement()) return;
    
    if(this.ballDist > 350) {
      this.distFromHome = Math.sqrt(Math.pow(this.initialX-this.x, 2)+Math.pow(this.initialY-this.y, 2));
      this.getMoveDirections(this.initialX, this.initialY);
      this.xChange = -(this.moveDirectionLR * this.distFromHome / 10)
      this.yChange = -(this.moveDirectionUD * this.distFromHome / 10)
      this.setX();
      this.setY();
    }else{
      this.getMoveDirections(ballX, ballY);
      this.xChange = this.moveDirectionLR*( 400 / this.ballDist ) + (this.personality * 5 - 2.5);
      this.yChange = this.moveDirectionUD*( 400 / this.ballDist ) + (this.personality * 5 - 2.5);
      this.setX();
      this.setY();
    }
  }

          /* --------- draw ---------*/

  this.drawBrick = function(ctx){
    // console.log('hello')
    let drawing = new Image() 
    drawing.src = "evilship.png" 
    ctx.drawImage(drawing, this.x, this.y, this.width, this.height);

    // ctx.beginPath();
    // ctx.rect(this.x, this.y, this.width, this.height);
    // ctx.fillStyle = "#e51400";
    // ctx.fill();
    // ctx.closePath();
    ctx.beginPath();
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(this.id, this.x+20, this.y+20);
    ctx.closePath();
  }

      /* --------- util functions ---------*/
  
  this.checkCollision = function(x, y){
    if(x>=this.x && x<=(this.x+this.width) && y>=this.y && y<=(this.y+this.height)){
      this.removeBrick();
      return true;
    }
    return false;
  }

      /* --------- state change ---------*/

  this.removeBrick = function(){
    this.dead = true;
  }

/* -------------- BINDINGS -----------------*/

/* -------------- FUNCTION CALLS -----------------*/

}