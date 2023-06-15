import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import 'bulma/css/bulma.css';
import './styles/index.scss';

import { App } from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement,
);

root.render(
  <HashRouter>
    <App />
  </HashRouter>,
);
