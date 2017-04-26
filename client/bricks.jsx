export  const Brick = function(id){

/* -------------- VARIABLES ----------------*/

  this.id = id;
  this.x = 0;
  this.y = 0;
  this.xMov = 50;
  this.yMov = 0;
  this.width = 50;
  this.height = 70;
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
  this.holdingPattern = [0];
  this.holdingPatternSpot = 0;
  this.holdingPatternLen = 0;
  this.circleRadius = (Math.random() * 10000000) % 60 + 15;

/* -------------- FUNCTIONS ----------------*/

      /* --------- initialization ---------*/

  this.setInitialPos = function(width, height){
    this.setActiveWidthAndHeight(width, height);
    this.initialX = Math.round((this.activeWidth[1] - 5) * Math.random() + 5);
    this.initialY = Math.round((this.activeHeight[1] - 5) * Math.random() + 5);
    this.findHoldingPattern();
    this.x = this.holdingPattern[1][0];
    this.y = this.holdingPattern[1][1];
    this.holdingPatternLen = this.holdingPattern.length;
  }
  this.setActiveWidthAndHeight = function(width, height){
    this.activeHeight = [5, Math.round(height + 50 * Math.random())];
    this.activeWidth = [Math.round(this.width+this.width*.3*Math.random()), Math.round(width-this.width-(Math.random()*this.width*.7))];
  }
  this.findHoldingPattern = function(){
    let opp=0, adj=0, circleAngle=0, circleMove, circleRadius = this.circleRadius, tempAngle;
    Math.random() >= .5 ? circleMove = -this.personality/5 : circleMove = this.personality/5;
    this.holdingPattern[1] = [Math.round(this.initialX + circleRadius), this.initialY];
    circleAngle += circleMove;
    while( !( circleAngle > -Math.abs(circleMove) && circleAngle < Math.abs(circleMove) ) ){
      if(circleAngle >= 180){
        circleAngle = -(180 - (circleAngle - 180));
      }else if(circleAngle <= -180){
        circleAngle = 180 - (Math.abs(circleAngle) - 180);
      }
      if(circleAngle > 90) {
        tempAngle = circleAngle - 90;
        opp = Math.sin(tempAngle) * -circleRadius;
        adj = Math.cos(tempAngle) * -circleRadius;
      }else if(circleAngle <= 90 && circleAngle >= 0){
        opp = Math.sin(circleAngle) * -circleRadius;
        adj = Math.cos(circleAngle) * circleRadius;
      }else if(circleAngle < -90){
        tempAngle = Math.abs(circleAngle) - 90;
        opp = Math.sin(tempAngle) * circleRadius;
        adj = Math.cos(tempAngle) * -circleRadius;
      }else if(circleAngle < 0 && circleAngle >= -90){
        tempAngle = circleAngle * -1;
        opp = Math.sin(tempAngle) * circleRadius;
        adj = Math.cos(tempAngle) * circleRadius;
      }
      this.holdingPattern.push([Math.round(this.initialX + adj), Math.round(this.initialY + opp)]);        
      circleAngle += circleMove;
    }
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
    this.circleAngle = (this.circleDirection * 5) + Math.atan2((this.initialY - this.y), (this.x - this.initialX)) * 180 / Math.PI;
    this.circleAngle += (this.circleDirection * 5);
    if(this.circleAngle >= 180){
      this.circleAngle = -(180 - (this.circleAngle - 180));
    }else if(this.circleAngle <= -180){
      this.circleAngle = 180 - (Math.abs(this.circleAngle) - 180);
    }

    if(this.id === 1) console.log(this.circleAngle);
    this.setX(undefined, undefined);
    this.setY(undefined, undefined);
  }
  this.stepForward = function(ballX, ballY, paddleX, paddleY){
    this.ballDist = Math.sqrt(Math.pow(ballX-this.x, 2)+Math.pow(ballY-this.y, 2));
    if(this.ballDist > 275) {
      this.distFromHome = Math.sqrt(Math.pow(this.initialX-this.x, 2)+Math.pow(this.initialY-this.y, 2));
      if(this.distFromHome >= this.circleRadius + 5){
        // console.log(this.id, '-->>', this.distFromHome, this.circleRadius+5)
        this.getMoveDirections(this.initialX, this.initialY);
        // console.log('x, y', -(this.moveDirectionLR * (this.distFromHome / 100 + 1)), -(this.moveDirectionUD * (this.distFromHome / 100 + 1)));
        this.setX(undefined, -this.moveDirectionLR * (this.distFromHome / 100 + 1) );
        this.setY(undefined, -this.moveDirectionUD * (this.distFromHome / 100 + 1) );
      }else {
        // console.log('holding pattern', this.id, '\n', this.ballDist, this.distFromHome, this.circleRadius+5)
        if(this.holdingPatternSpot === this.holdingPatternLen - 1) this.holdingPatternSpot = 0;
        // if(this.holdingPattern[0] === 7) {
          this.holdingPatternSpot++;
          // this.holdingPattern[0] = -1;
        // }
        // this.holdingPattern[0]++;
        // if(this.id === 1) console.log(this.holdingPatternSpot, this.holdingPattern[0], this.holdingPatternLen);
        this.setX(this.holdingPattern[this.holdingPatternSpot][0], 0)
        this.setY(this.holdingPattern[this.holdingPatternSpot][1], 0)
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

    // for(let i = 1; i<this.holdingPatternLen-1; i++){
    //   ctx.beginPath();
    //   ctx.fillStyle = "white";
    //   ctx.fill(this.id, this.x+20, this.y+20);
    //   ctx.closePath();
    // }
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