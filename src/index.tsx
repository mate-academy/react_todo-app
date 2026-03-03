import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { App } from './App';
import { GlobalTodoProvide } from './components/TodoProvider';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalTodoProvide>
    <App />
  </GlobalTodoProvide>,
);
