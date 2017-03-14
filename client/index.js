import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect} from 'react-router';
import { Provider } from 'react-redux';

import Store from '../redux/store.js';
import MainContainer from './maincontainer.jsx';





ReactDOM.render(
  <Provider store={Store}>
    <Router history={hashHistory}>
      <Route path='/'>
        <Route path='/main' component={MainContainer}/>
        <IndexRedirect to="/main" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('Main')
);