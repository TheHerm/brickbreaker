import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect} from 'react-router';

import MainContainer from './maincontainer.jsx';





ReactDOM.render(
    <Router history={hashHistory}>
      <Route path='/'>
        <Route path='/main' component={MainContainer}/>
        <IndexRedirect to="/main" />
      </Route>
    </Router>,
  document.getElementById('Main')
);