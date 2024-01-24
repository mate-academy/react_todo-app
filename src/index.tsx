import { createRoot } from 'react-dom/client';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { GlobalStateProvider } from './management/TodoContext';
import { TodoApp } from './components/TodoApp';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalStateProvider>
    <TodoApp />
  </GlobalStateProvider>,
);
