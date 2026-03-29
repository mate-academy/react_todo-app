import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { App } from './App';
import { TodosContextProvider } from './types/todoContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodosContextProvider>
    <App />
  </TodosContextProvider>,
);
