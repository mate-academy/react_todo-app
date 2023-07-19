import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';
import './styles/utils/transition.css';
import './styles/utils/loader.css';
import './styles/form.css';
import './styles/title.css';

import { HashRouter } from 'react-router-dom';
import { TodoApp } from './TodoApp';

ReactDOM.render(
  <HashRouter>
    <TodoApp />
  </HashRouter>,
  document.getElementById('root'),
);
