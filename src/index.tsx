import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { TodosProvider } from './TodoContext';

import './styles/index.scss';
import './styles/todo-list.scss';
import './styles/filters.scss';

import { App } from './App';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <TodosProvider>
        <App />
      </TodosProvider>
    </Router>,
  );
