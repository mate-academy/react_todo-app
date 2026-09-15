import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import { TodoProvider } from './context/Context';
import { App } from './App';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodoProvider>
    <App />
  </TodoProvider>,
);
