import React, { Component } from 'react';
import { BrickBreaker } from './canvaslogic.js';
// import { connect } from 'react-redux';
// import Store from '../redux/store.js';


class CanvasContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      start: 0,
      game: null,
      lives: 3,
      score: 0
    }
    this.handleStartGame = this.handleStartGame.bind(this);
    this.handleEndGame = this.handleEndGame.bind(this);
    this.updateGameStats = this.updateGameStats.bind(this);
  }

  componentDidMount(){
    this.setState({ game: new BrickBreaker(this.updateGameStats)} );
  }

  handleStartGame(){
    this.setState({ start: 1, score: this.state.game.score, lives: this.state.game.lives });
    this.state.game.startGame(this.props.height, this.props.width);
  }

  handleEndGame(){
    this.setState({ start: 0 });
    this.state.game.stopGame();
  }

  updateGameStats(){
    this.setState({score: this.state.game.score, lives: this.state.game.lives})
  }

  render(){
    return (
      <div className="canvas-container">
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
    )
  }
}




export default CanvasContainer;