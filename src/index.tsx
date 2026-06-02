import { createRoot } from 'react-dom/client';
import { TodoProvider } from './context/TodoContext';
import { App } from './App';
import './styles/index.scss';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodoProvider>
    <App />
  </TodoProvider>,
);
