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
  this.ballDirectionUD = null;
  this.personality = Math.random() + .1;
  this.activeWidth = [0,0];
  this.activeHeight = [0,0];
  this.xChange = 0;
  this.yChange = 0;

/* -------------- FUNCTIONS ----------------*/

      /* --------- initialization ---------*/

  this.setInitialPos = function(width, height){
    this.activeHeight = [5, height];
    this.activeWidth = [this.width+this.width*.5*Math.random(), width-this.width+(Math.random()*this.width*.5)];
    if(this.id == 1) console.log(this.activeHeight);
    this.x = Math.round((width - this.width) * Math.random());
    this.y = Math.round((height - this.height) * Math.random());
  }

      /* --------- frame change ---------*/
  this.setX = function(x = this.x){
    this.x = Math.round(x + this.xChange)
  }
  this.setY = function(y = this.y){
    this.y = Math.round(y + this.yChange)
  }
  this.getBallDirections = function(x, y){
    if(x - this.x > 0) this.ballDirectionLR = -1;
    else this.ballDirectionLR = 1;
    if(y - this.y > 0) this.ballDirectionUD = -1;
    else this.ballDirectionUD = 1;
  }
  this.stepForward = function(x, y){
    this.ballDist = Math.sqrt(Math.pow(x-this.x, 2)+Math.pow(y-this.y, 2));
    this.getBallDirections(x, y);
    if(this.x < this.activeWidth[0]){
      this.xChange = 0;
      this.setX(this.activeWidth[0] + 10);
      return;
    }else if(this.x > this.activeWidth[1]){
      this.xChange = 0;
      this.setX(this.activeWidth[1] - 10);
      return;
    }
    if(this.y < this.activeHeight[0]){
      this.yChange = 0;
      this.setY(this.activeHeight[0] + 10);
      return;
    }else if(this.y > this.activeHeight[1]) {
      this.yChange = 0;
      this.setY(this.activeHeight[1] - 10);
      return;
    }
    if(this.ballDist > 350) {
      this.ballDirectionLR = -this.ballDirectionLR;
      this.ballDirectionUD = -this.ballDirectionUD;
      this.xChange = this.ballDirectionLR * 2 + (this.personality * 5 - 2.5);
      this.yChange = this.ballDirectionUD * 2 + (this.personality * 5 - 2.5);
      this.setX();
      this.setY();
    }else{
      this.xChange = this.ballDirectionLR*( 400 / this.ballDist ) + (this.personality * 5 - 2.5);
      this.yChange = this.ballDirectionUD*( 400 / this.ballDist ) + (this.personality * 5 - 2.5);
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