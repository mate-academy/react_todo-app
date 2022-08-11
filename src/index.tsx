import ReactDOM from 'react-dom';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
);
