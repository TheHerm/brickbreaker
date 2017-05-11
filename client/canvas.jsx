import React, { Component } from 'react';
import { BrickBreaker } from './canvaslogic.js';

class CanvasContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      start: false,
      pause: false,
      game: null,
      lives: 3,
      score: 0
    }
    this.handleStartGame = this.handleStartGame.bind(this);
    this.handleEndGame = this.handleEndGame.bind(this);
    this.updateGameStats = this.updateGameStats.bind(this);
  }

  componentDidMount(){
    setTimeout(()=>{
      this.setState({ game: new BrickBreaker(this.updateGameStats)} );
    }, 1500);
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.start === true && prevState.start === false){
      this.countdown();
    }
  }

  handleStartGame(num){
    if(this.state.start){
      return;
    }else {
      this.state.game.setDifficulty(num);
      this.setState({ 
        start: true, 
        score: this.state.game.score, 
        lives: this.state.game.lives,
      });
    }
  }

  countdown(){
    this.state.game.initializeGame();
  }

  handleEndGame(){
    this.setState({ start: false });
    this.state.game.stopGame();
  }

  handlePauseGame(){
    if(this.state.pause){
      // start game
    }else {
      // pause game
    }
    this.setState({ pause: !this.state.pause});
  }

  updateGameStats(){
    this.setState({score: this.state.game.score, lives: this.state.game.lives})
  }

  render(){
    return (
      <div className="canvas-container">
        {
          !this.state.start ?
              <div className="brickbreaker-splash">
                <img src="splash.jpg" className="splash-img" />
                <div className="brickbreaker-splash-btn-container">
                  <div className="brickbreaker-splash-btn easy" onClick={() => this.handleStartGame(1)}>Easy</div>
                  <div className="brickbreaker-splash-btn medium" onClick={() => this.handleStartGame(2)}>Medium</div>
                  <div className="brickbreaker-splash-btn hard" onClick={() => this.handleStartGame(3)}>Hard</div>
                </div>
              </div>
            :
              <div>
                <div>
                  {
                    !this.state.start && <div><button className="start-btn" autoFocus onClick={this.handleStartGame}>Start Game</button></div>
                  }
                  {
                    !!this.state.start && <div><button className="pause-btn" autoFocus onClick={this.handleEndGame}>Pause Game</button></div>
                  }
                  <div className="stats">
                    LIVES:
                  </div>
                  <div className="stats">
                    {
                      this.state.game && this.state.lives
                    }
                  </div>
                  <div className="stats">
                    SCORE:
                  </div>
                  <div className="stats">
                    {
                      this.state.game && this.state.score
                    }
                  </div>
                </div>
                <canvas id="myCanvas" width={this.props.width} height={this.props.height}></canvas>
              </div>
        }
      </div>
    )
  }
}




export default CanvasContainer;