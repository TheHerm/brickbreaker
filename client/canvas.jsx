import React, { Component } from 'react';
import { FillCanvas } from './canvaslogic.js';
// import { connect } from 'react-redux';
// import Store from '../redux/store.js';


class CanvasContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      start: 0,
      game: null
    }
    this.handleStartGame = this.handleStartGame.bind(this);
    this.handleEndGame = this.handleEndGame.bind(this);
  }

  componentDidMount(){
    this.setState({ game: new FillCanvas()} );
  }

  handleStartGame(){
    this.setState({ start: 1 });
    this.state.game.startGame(this.props.height, this.props.width);
  }

  handleEndGame(){
    this.setState({ start: 0 });
    this.state.game.stopGame();
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
          <div>
            LIVES:
          </div>
          <div>
            {
              this.state.game && this.state.game.lives
            }
          </div>
          <div>
            SCORE:
          </div>
          <div>
            {
              this.state.game && this.state.game.score
            }
          </div>
        </div>
        <canvas id="myCanvas" width={this.props.width} height={this.props.height}></canvas>
      </div>
    )
  }
}




export default CanvasContainer;