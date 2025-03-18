import { createRoot } from 'react-dom/client';
import { TodosProvider } from './component/TodoContext';
import './styles/index.scss';
import { App } from './App';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodosProvider>
    <App />
  </TodosProvider>,
);
