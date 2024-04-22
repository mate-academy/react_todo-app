import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { TodosProvider } from './component/TodosContext';
import { App } from './App';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodosProvider>
    <App />
  </TodosProvider>,
);
