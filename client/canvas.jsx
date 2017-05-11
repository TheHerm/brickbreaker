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
    this.updateGameStats = this.updateGameStats.bind(this);
    this.handlePauseGame = this.handlePauseGame.bind(this);
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

  handlePauseGame(){
    this.state.game.pauseGame();
    this.setState({ pause: !this.state.pause});
  }

  updateGameStats(){
    this.setState({score: this.state.game.score, lives: this.state.game.lives})
  }

  render(){
    return (
      <div className="brickbreaker-container">
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
              <div className="canvas-container">
                <div className="stats-container">
                    <div className={!this.state.pause ? "start-btn hidden" : "start-btn"} autoFocus onClick={this.handlePauseGame}> <img className="start-btn-img"src="play.png" alt="play"/> </div>
                    <div className={this.state.pause ? "pause-btn hidden" : "pause-btn"} autoFocus onClick={this.handlePauseGame}> <img className="pause-btn-img"src="pause.png" alt="pause"/> </div>
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