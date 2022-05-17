import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { TodoApp } from './TodoApp';
import { TodosProvider } from './TodosContext';

ReactDOM.render(
  <TodosProvider>
    <TodoApp />
  </TodosProvider>,
  document.getElementById('root'),
);
