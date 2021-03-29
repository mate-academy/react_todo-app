import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import App from './App';
import { TodosProvider } from './components/TodosContext';

ReactDOM.render(
  <HashRouter>
    <TodosProvider>
      <App />
    </TodosProvider>
  </HashRouter>,
  document.getElementById('root'),
);
