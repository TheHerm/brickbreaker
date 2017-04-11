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
    this.state.game.startGame();
  }

  handleEndGame(){
    this.setState({ start: 0 });
    this.state.game.stopGame();
  }

  render(){
    return (
      <div className="canvas-container">
        <canvas id="myCanvas" width="1000" height="650"></canvas>
        {
          !this.state.start && <div><button onClick={this.handleStartGame}>Start Game</button></div>
        }
        {
          !!this.state.start && <div><button onClick={this.handleEndGame}>Pause Game</button></div>
        }
      </div>
    )
  }
}




export default CanvasContainer;