import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { App } from './App';
import { TodoProvider } from './context/TodoContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodoProvider>
    <App />
  </TodoProvider>,
);
