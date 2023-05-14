import './styles/index.scss';
import './styles/todo-list.scss';
import './styles/filters.scss';
import './styles/sign-in.scss';
import './styles/loader.scss';
import './styles/notification.scss';
import './styles/sign-up.scss';

import { HashRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { TodoApp } from './components/TodoApp';
import { SignUpPage } from './components/SignUpPage';
import { GlobalProvider } from './helper/GlobalContext';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <HashRouter>
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route index element={<TodoApp />} />
          <Route path="active" element={<TodoApp />} />
          <Route path="completed" element={<TodoApp />} />
          <Route path="/login" element={<SignUpPage />} />
        </Routes>
      </GlobalProvider>
    </HashRouter>,
  );
