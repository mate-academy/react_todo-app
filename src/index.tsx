/* eslint-disable import/no-extraneous-dependencies */
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import './styles/main.scss';

import { App } from './App';
import { TodosProvider } from './utils/TodosContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodosProvider>
    <Router>
      <App />
    </Router>
  </TodosProvider>,
);
