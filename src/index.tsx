import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { TodoApp } from './App';

ReactDOM.render(

  <HashRouter>
    <TodoApp />
  </HashRouter>,
  document.getElementById('root'),
);
