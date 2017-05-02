export  const Bullets = function(brickX, brickY, paddleX, brickWidth, brickHeight, canvasHeight){

/* -------------- VARIABLES ----------------*/

  this.x = 0;
  this.y = 0;
  this.yChange = 0;
  this.xChange = 0;
  this.xMov = 0;
  this.yMov = 0;
  this.width = 30;
  this.height = 70;
  this.drawing = null;
  this.bulletAngle = 0;
  this.target = 0;
  


/* -------------- FUNCTIONS ----------------*/

      /* --------- initialization ---------*/
  this.initialize = function(){
    this.drawing = new Image();
    this.drawing.src = "laser.png";
    this.x = brickX + brickWidth/2;
    this.y = brickY + brickHeight;
    this.target = paddleX + 60;
    this.findBulletAngle();
    this.setXYChange();
  }
  this.findBulletAngle = function(){
    let opp = this.x - this.target;
    let adj = canvasHeight - this.y;
    this.bulletAngle = Math.atan2(opp, adj);
  }
  this.setXYChange = function(){

  }

      /* --------- behavior ---------*/
  this.setX = function(x = this.x, change = this.xChange){
    this.x = Math.round(x + change)
  }
  this.setY = function(y = this.y, change = this.yChange){
    this.y = Math.round(y + change)
  }
  this.stepForward = function(){
    this.setY();
    this.setX();
  }

          /* --------- draw ---------*/

  this.drawBullet = function(ctx){
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.bulletAngle);
    ctx.drawImage(this.drawing, 0, 0, this.width, this.height);
    ctx.translate(0,0);
    ctx.restore();
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


/* -------------- BINDINGS -----------------*/

/* -------------- FUNCTION CALLS -----------------*/

this.initialize();

}