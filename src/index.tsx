import { createRoot } from 'react-dom/client';

import './styles/index.css';

import { App } from './App';
import { TodosProvider } from './context/TodosProvider';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodosProvider>
    <App />
  </TodosProvider>,
);
