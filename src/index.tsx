import { createRoot } from 'react-dom/client';
import { TodosContext } from './components/TodosContext';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodosContext>
    <App />
  </TodosContext>,
);
