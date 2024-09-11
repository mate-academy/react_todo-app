import { createRoot } from 'react-dom/client';

import './styles/index.scss';
import './styles/todo.scss';
import './styles/todoapp.scss';
import './styles/filter.scss';

// import 'bulma/css/bulma.css';

import { App } from './App';
import { TaskContextProvider } from './contexts/TaskContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TaskContextProvider>
    <App />
  </TaskContextProvider>,
);
