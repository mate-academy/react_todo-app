import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import App from './App';
import { TodoProvider } from './context/TodoContextProvider';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodoProvider>
    <App />
  </TodoProvider>,
);
