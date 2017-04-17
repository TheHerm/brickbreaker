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
  this.ballDirectionLR = null;
  this.personality = Math.random() + .1;
  this.activeWidth = [0,0];
  this.activeHeight = [0,0];
  this.change = 0;

/* -------------- FUNCTIONS ----------------*/

      /* --------- initialization ---------*/

  this.setInitialPos = function(width, height){
    this.activeHeight = [this.height-20, height-(this.height-20)];
    this.activeWidth = [this.width+this.width*.5*Math.random(), width-this.width+(Math.random()*this.width*.5)];
    this.x = Math.round((width - this.width) * Math.random());
    this.y = Math.round((height - this.height) * Math.random());
  }

      /* --------- frame change ---------*/

  this.stepForward = function(x, y){
    this.ballDist = Math.sqrt(Math.pow(x-this.x, 2)+Math.pow(y-this.y, 2));
    if(x - this.x > 0) this.ballDirectionLR = -1;
    else this.ballDirectionLR = 1;
    if(this.ballDist > 400) {
      this.ballDirectionLR = -this.ballDirectionLR;
      this.change = this.ballDirectionLR * 2;
    }else{
      if(this.x < this.activeWidth[0] || this.x > this.activeWidth[1]) return;
      this.change = this.ballDirectionLR*this.personality*( 500 / this.ballDist )
    }
    if(this.id == 1) console.log(this.change)
    this.x = Math.round(this.change + this.x); 
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