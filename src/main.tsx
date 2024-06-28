import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App.tsx';
import { TodosProvider } from './components/TodosContext.tsx';

createRoot(document.getElementById('root')!).render(
  <TodosProvider>
    <Router>
      <App />
    </Router>
  </TodosProvider>,
);
