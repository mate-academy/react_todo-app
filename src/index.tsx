import { createRoot } from 'react-dom/client';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { TodoApp } from './components/TodoApp';
import { GlobalProvider } from './manage/TodoContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalProvider>
    <TodoApp />
  </GlobalProvider>,
);
