import { createRoot } from 'react-dom/client';

import './styles/filter.scss';
import './styles/todoapp.scss';
import './styles/todo.scss';
import './styles/index.scss';

import { App } from './App';
import { GlobalTodoProvider } from './context/ToDoContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalTodoProvider>
    <App />
  </GlobalTodoProvider>
);
