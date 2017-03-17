import React, { Component } from 'react';
import { fillCanvas } from './canvaslogic.js';
// import { connect } from 'react-redux';
// import Store from '../redux/store.js';


class CanvasContainer extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    fillCanvas();
  }

  render(){
    return (
      <div className="canvas-container">
        <canvas id="myCanvas" width="700" height="500"></canvas>
      </div>
    )
  }
}




export default CanvasContainer;