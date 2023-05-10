import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';
import './styles/notification.css';

import { App } from './App';
import { TodoApp } from './components/TodoApp/TodoApp';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<TodoApp />} />
          <Route path="completed" element={<TodoApp />} />
          <Route path="active" element={<TodoApp />} />
        </Route>
      </Routes>
    </HashRouter>,
  );
