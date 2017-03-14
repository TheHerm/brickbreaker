import React, { Component } from 'react';
import { connect } from 'react-redux';


class MainContainer extends React.Component{
  constructor(props){
    super(props);
    this.handleCountClick = this.handleCountClick.bind(this);
  }

  handleCountClick(){

  }

  render(){
    return (
      <div>
        <div className="title-text">Hello World!!</div>
        <div onClick={this.handleCountClick}>{this.props.count}</div>
      </div>
    )
  }
}

const mapStateToProps = function(state){
  console.log(state);
  return {
    count: state.count
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);