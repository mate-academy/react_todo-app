import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';

import store from './redux/store';

import './base.css';
import './index.css';
import App from './components/App';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Route path="/:filter?" component={App} />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
