import { createRoot } from 'react-dom/client';

import './styles/filter.scss';
import './styles/index.scss';
import './styles/todo.scss';
import './styles/todoapp.scss';

import { App } from './App';
import { TodosProvider } from './context';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodosProvider>
    <App />
  </TodosProvider>,
);
