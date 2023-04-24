import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import 'bulma/css/bulma.css';
import './styles/index.scss';

import { App } from './App';

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root'),
);
