import { HashRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App';

const Root = () => (
  <Router>
    <App />
  </Router>
);

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(<Root />);
