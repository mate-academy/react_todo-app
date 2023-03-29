import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import 'bulma/css/bulma.css';
import './styles/index.scss';
import './styles/todoapp.scss';
import './styles/filter.scss';

import { App } from './App';
// import { Route, Routes } from 'react-router';

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root'),
);
