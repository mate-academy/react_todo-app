import { createRoot } from 'react-dom/client';

import './styles/index.scss';
import './styles/todoapp.scss';
import './styles/todo.scss';
import './styles/filter.scss';

import { App } from './App';
import { TodosProvider } from './components/TodosContext/TodosContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodosProvider>
    <App />
  </TodosProvider>,
);
