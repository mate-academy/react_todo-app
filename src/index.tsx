import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { App } from './App';
import { TodoContextProvider } from './contexts/TodoContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodoContextProvider>
    <App />
  </TodoContextProvider>,
);
