/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <HashRouter>
    <App />
  </HashRouter>,
);
