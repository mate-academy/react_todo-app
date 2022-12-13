import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { App } from './App';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,

  document.getElementById('root'),
);
