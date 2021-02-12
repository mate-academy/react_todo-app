import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';
import { BrowserRouter } from 'react-router-dom';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';

import App from './App';

ReactDOM.render(
  <BrowserRouter>
    {/* <Provider store={createStore()}> */}
    <App />
    {/* </Provider> */}
  </BrowserRouter>,
  document.getElementById('root'),
);
