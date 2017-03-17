import React, { Component } from 'react';
import { connect } from 'react-redux';
import Store from '../redux/store.js';
import CanvasContainer from './canvas.jsx';

export class MainContainer extends React.Component{
  constructor(props){
    super(props);
    // this.handleCountClick = this.handleCountClick.bind(this);
  }

  handleCountClick(){
    // Store.dispatch(incrementCount());
  }

  render(){
    return (
      <CanvasContainer />
    )
  }
}

const mapStateToProps = function(state){
  return {

  }
}

const mapDispatchToProps = function(dispatch){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);