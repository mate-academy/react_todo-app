import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';
import './styles/loginUsers.css';

import { App } from './App';
import { TodoApp } from './components/TodoApp';
import { NotFoundPage } from './pages/NotFoundPage';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<TodoApp />} />
          <Route path="completed" element={<TodoApp />} />
          <Route path="active" element={<TodoApp />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>,
  );
