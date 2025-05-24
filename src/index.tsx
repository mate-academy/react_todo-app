import { createRoot } from 'react-dom/client';
import 'bulma/css/bulma.css';
import './styles/index.scss';

import { App } from './App';
import { TodosProvider } from './context/TodosContext';
import { FilterProvider } from './context/FilteredTodosContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodosProvider>
    <FilterProvider>
      <App />
    </FilterProvider>
  </TodosProvider>,
);
