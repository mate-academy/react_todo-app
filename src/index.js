import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { compose, createStore } from 'redux';
import App from './App';
import { rootReducer } from './redux/rootReducer';

const store = createStore(rootReducer, compose(
  /* eslint-disable no-underscore-dangle */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
