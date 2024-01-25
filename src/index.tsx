import { createRoot } from 'react-dom/client';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App';
import { TodosProvider } from './contexts/TodosProvider';

const Root = () => (
  <TodosProvider>
    <App />
  </TodosProvider>
);

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(<Root />);
