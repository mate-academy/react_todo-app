import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { TodosContextProvider } from './components';
import TodoApp from './TodoApp';

ReactDOM.render(
  <HashRouter>
    <TodosContextProvider>
      <TodoApp />
    </TodosContextProvider>
  </HashRouter>,
  document.getElementById('root'),
);
