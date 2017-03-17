import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import Store from '../redux/store.js';


class CanvasContainer extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.rect(20, 40, 50, 50);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
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