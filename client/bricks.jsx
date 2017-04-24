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
  this.xEscape = 1;
  this.yEscape = -1;
  this.lastBallDist = 0;
  this.circleRadius = (Math.random() * 10000000) % 60 + 15;
  this.circleDirection = 0;

/* -------------- FUNCTIONS ----------------*/

      /* --------- initialization ---------*/

  this.setInitialPos = function(width, height){
    this.setActiveWidthAndHeight(width, height);
    this.initialX = Math.round((this.activeWidth[1] - 5) * Math.random() + 5);
    this.initialY = Math.round((this.activeHeight[1] - 5) * Math.random() + 5);
    this.x = this.initialX;
    this.y = this.initialY;
    Math.random() >= .5 ? this.circleDirection = 1 : this.circleDirection = -1; 
  }
  this.setActiveWidthAndHeight = function(width, height){
    this.activeHeight = [5, Math.round(height + 50 * Math.random())];
    this.activeWidth = [Math.round(this.width+this.width*.3*Math.random()), Math.round(width-this.width-(Math.random()*this.width*.7))];
  }

      /* --------- behavior ---------*/
  this.setX = function(x = this.x, change = this.xChange){
    this.x = Math.round(x + change)
  }
  this.setY = function(y = this.y, change = this.yChange){
    this.y = Math.round(y + change)
  }
  this.getMoveDirections = function(x, y){
    if(x - this.x > 0) this.moveDirectionLR = -1;
    else this.moveDirectionLR = 1;
    if(y - this.y > 0) this.moveDirectionUD = -1;
    else this.moveDirectionUD = 1;
  }
  this.escapeMoveY = function(){
    if(this.y < this.activeHeight[0] + this.activeHeight[1] * .1){
      this.yEscape = 1;
    }else if( this.y > this.activeHeight[1] - this.activeHeight[1] * .1){
      this.yEscape = -1;
    }
    this.yChange = this.yEscape * (4 * this.personality + 2);
  }
  this.escapeMoveX = function(){
    if(this.x < this.activeWidth[0] + this.activeWidth[1] * .1){
      this.xEscape = 1;
    }else if( this.y > this.activeWidth[1] - this.activeWidth[1] * .1){
      this.xEscape = -1;
    }
    this.xChange = this.xEscape * (4 * this.personality + 2);
  }
  this.restrainXMovement = function(){
    if(this.x <= this.activeWidth[0]){
      this.escapeMoveY();
      this.setY();
      this.setX(this.activeWidth[0], 0);
      return true;
    }else if(this.x >= this.activeWidth[1]){
      this.escapeMoveY();
      this.setY();
      this.setX(this.activeWidth[1], 0);
      return true;
    }
    return false
  }
  this.restrainYMovement = function(){
    if(this.y <= this.activeHeight[0]){
      this.escapeMoveX();
      this.setX();
      this.setY(this.activeHeight[0], 0);
      return true;
    }else if(this.y >= this.activeHeight[1]) {
      this.escapeMoveX();
      this.setX();
      this.setY(this.activeHeight[1], 0);
      return true;
    }
    return false;
  }
  this.circleHome = function(){
    
    this.setX(undefined, );
    this.setY(undefined, );
  }
  this.stepForward = function(ballX, ballY, paddleX, paddleY){
    this.ballDist = Math.sqrt(Math.pow(ballX-this.x, 2)+Math.pow(ballY-this.y, 2));
    this.lastBallDist = this.ballDist;
    // this.paddleDist = Math.sqrt(Math.pow(paddleX-this.x, 2)+Math.pow(paddleY-this.y, 2));
    if(this.ballDist > 275) {
      this.distFromHome = Math.sqrt(Math.pow(this.initialX-this.x, 2)+Math.pow(this.initialY-this.y, 2));
      if(this.distFromHome > this.circleRadius){
        this.getMoveDirections(this.initialX, this.initialY);
        this.setX(undefined, (-this.moveDirectionLR * this.distFromHome / 100) );
        this.setY(undefined, (-this.moveDirectionUD * this.distFromHome / 100) );
      }else {
        this.circleHome();
      }
    }else{
      if(this.restrainXMovement()) return;
      if(this.restrainYMovement()) return;
      this.getMoveDirections(ballX, ballY);
      this.setX(undefined, this.moveDirectionLR*( 400 / this.ballDist ) + (this.personality * 5 - 2.5));
      this.setY(undefined, this.moveDirectionUD*( 400 / this.ballDist ) + (this.personality * 5 - 2.5));
    }
  }

          /* --------- draw ---------*/

  this.drawBrick = function(ctx){
    let drawing = new Image() 
    drawing.src = "evilship.png" 
    ctx.drawImage(drawing, this.x, this.y, this.width, this.height);

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