import { createRoot } from 'react-dom/client';

import './styles/index.scss';
// import './styles/todo-list.scss';
// import './styles/filter.scss';

import { App } from './App';
import { TodosProvider } from './Components/TodosContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodosProvider>
    <App />
  </TodosProvider>,
);
