import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { TodosProvider } from './utils/TodosContext';
import { LoadingErrorProvider } from './utils/LoadingErrorContext';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';
import App from './App';

ReactDOM.render(
  <HashRouter>
    <LoadingErrorProvider>
      <TodosProvider>
        <App />
      </TodosProvider>
    </LoadingErrorProvider>
  </HashRouter>,
  document.getElementById('root'),
);
