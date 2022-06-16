import React from 'react';

import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'),
);
