import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import Store from '../redux/store.js';
import CanvasContainer from './canvas.jsx';

export class MainContainer extends React.Component{
  constructor(props){
    super(props);
    // javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()
    // window.addEventListener('load', function () {
      let specDiv = document.body.children.item(1)
      specDiv.className = 'spec-container';
      specDiv.children.item(0).className = 'spec';
      specDiv.children.item(1).className = 'spec';
      specDiv.children.item(2).className = 'spec';
    // });
}



  render(){
    return (
      <CanvasContainer height={$(document).height() - 20} width={Math.round($(document).width() * 4/5)}/>
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