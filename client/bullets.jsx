export  const Bullets = function(brickX, brickY, paddleX){

/* -------------- VARIABLES ----------------*/

  this.x = brickX;
  this.y = brickY;
  this.xMov = 50;
  this.yMov = 0;
  this.width = 30;
  this.height = 70;
  this.drawing = new Image();
  this.drawing.src = "laser.png" 
  this.bulletAngle = null;
  

/* -------------- FUNCTIONS ----------------*/

      /* --------- initialization ---------*/


      /* --------- behavior ---------*/
  this.setX = function(x = this.x, change = this.xChange){
    this.x = Math.round(x + change)
  }
  this.setY = function(y = this.y, change = this.yChange){
    this.y = Math.round(y + change)
  }
  this.stepForward = function(paddleX){
    console.log('step bullet forward');
  }

          /* --------- draw ---------*/

  this.drawBullet = function(ctx){
    ctx.drawImage(this.drawing, this.x, this.y, this.width, this.height);

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

}