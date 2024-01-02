import { createRoot } from 'react-dom/client';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';
import { GlobalStateProvider } from './components/Store';
import { TodoFiltersProvider } from './components/FilterContext';
import { App } from './App';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodoFiltersProvider>
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
    ,
  </TodoFiltersProvider>,
);
