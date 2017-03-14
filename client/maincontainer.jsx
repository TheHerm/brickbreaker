import React, { Component } from 'react';
import { connect } from 'react-redux';
import Store from '../redux/store.js';
import { incrementCount } from '../redux/reducers/counter.js';


class MainContainer extends React.Component{
  constructor(props){
    super(props);
    this.handleCountClick = this.handleCountClick.bind(this);
  }

  handleCountClick(){
    Store.dispatch(incrementCount());
  }

  render(){
    return (
      <div>
        <div className="title-text">Hello World!!</div>
        <div className="count" onClick={this.handleCountClick}>{this.props.count}</div>
      </div>
    )
  }
}

const mapStateToProps = function(state){
  return {
    count: state.count
  }
}

const mapDispatchToProps = function(dispatch){
  return {

  }
}



export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);