import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App';

const Root = () => (
  <HashRouter>
    <App />
  </HashRouter>
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(<Root />);
