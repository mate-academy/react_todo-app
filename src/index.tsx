import { createRoot } from 'react-dom/client';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { TodoApp } from './TodoApp';
import { TodosContextProvider } from './contexts/TodosContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodosContextProvider>
    <TodoApp />
  </TodosContextProvider>,
);
