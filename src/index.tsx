import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import './styles/index.scss';

import { App } from './App';
import { TodoProvider } from './context/TodoContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodoProvider>
    <App />
  </TodoProvider>,
);
