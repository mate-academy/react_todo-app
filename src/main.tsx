import { createRoot } from 'react-dom/client';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { TodosProvider } from './components/TodosContext.tsx';
import { App } from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <TodosProvider>
    <App />
  </TodosProvider>,
);
