import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import store from './redux/store';

import './base.css';
import './index.css';
import App from './components/App/App';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/react_todo-app">
      <Route path="/:filter?" component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
