import React, { Component } from 'react';
import { FillCanvas } from './canvaslogic.js';
// import { connect } from 'react-redux';
// import Store from '../redux/store.js';


class CanvasContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      start: null,
      game: null
    }
    this.handleStartGame = this.handleStartGame.bind(this);
  }

  componentDidMount(){
    this.setState({ game: new FillCanvas()} );
  }

  handleStartGame(){
    this.setState({ start: 1 });
    this.state.game.startGame();
  }

  render(){
    return (
      <div className="canvas-container">
        <canvas id="myCanvas" width="700" height="500"></canvas>
        {
          !this.state.start && <div><button onClick={this.handleStartGame}>Start Game</button></div>
        }
      </div>
    )
  }
}




export default CanvasContainer;