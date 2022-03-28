import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import { TodoApp } from './TodoApp';
import { TodoProvider } from './lib/shared/TodoContext';

import './lib/reset.scss';

ReactDOM.render(
  <Router>
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  </Router>,
  document.getElementById('root'),
);
