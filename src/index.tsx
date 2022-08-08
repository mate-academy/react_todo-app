import ReactDOM from 'react-dom';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';
import { HashRouter } from 'react-router-dom';
import { App } from './App';

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root'),
);
