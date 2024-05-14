import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.scss';
import './styles/todo-list.scss';
import './styles/filters.scss';

import { App } from './App';
import { ToDoProvider } from './context/ToDoProvider';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <BrowserRouter>
    <ToDoProvider>
      <App />
    </ToDoProvider>
  </BrowserRouter>,
);
