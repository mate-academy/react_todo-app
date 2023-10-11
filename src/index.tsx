import { createRoot } from 'react-dom/client';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App';
import { TodoProvider } from './context/TodoContext';
import { FilterProvider } from './context/FilterContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodoProvider>
    <FilterProvider>
      <App />
    </FilterProvider>
  </TodoProvider>,
);
