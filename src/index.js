import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import TodoApp from './TodoApp';

ReactDOM.render(
  <BrowserRouter>
    <TodoApp />
  </BrowserRouter>,
  document.getElementById('root'),
);
