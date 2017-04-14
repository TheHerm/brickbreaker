export  const Brick = function(id){

/* -------------- VARIABLES ----------------*/

  this.id = id;
  this.x = 0;
  this.y = 0;
  this.xMov = 0;
  this.yMov = 0;
  this.rowCount = 3;
  this.columnCount = 12;
  this.width = 70;
  this.height = 25;
  this.padding = 5;
  this.offsetTop = 50;
  this.offsetLeft = 47;
  this.dead = false;

/* -------------- FUNCTIONS ----------------*/

      /* --------- frame change ---------*/

  this.stepForward = function(){
    this.x += this.xMov;
    this.y += this.yMov;
  }

          /* --------- draw ---------*/

  this.drawBrick = function(ctx){
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "#e51400";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(this.id, this.x+20, this.y+20);
    ctx.closePath();
  }

      /* --------- initialization ---------*/

  this.setInitialPos = function(width, height){
    this.x = (width - this.width) * Math.random();
    this.y = (height - this.height) * Math.random();
  }

      /* --------- state change ---------*/

  this.removeBrick = function(){
    this.dead = true;
  }

/* -------------- BINDINGS -----------------*/

/* -------------- FUNCTION CALLS -----------------*/

}