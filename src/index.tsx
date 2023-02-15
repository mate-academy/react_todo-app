import ReactDOM from 'react-dom/client';
import React from 'react';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';
import {
  HashRouter as Router,
} from 'react-router-dom';
import { App } from './App';

const root
 = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement,
 );

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
);
