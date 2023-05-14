import ReactDOM from 'react-dom';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';
import { HashRouter } from 'react-router-dom';

import { TodoApp } from './components/TodoApp/TodoApp';

ReactDOM.render(
  <HashRouter>
    <TodoApp />
  </HashRouter>,
  document.getElementById('root'),
);
