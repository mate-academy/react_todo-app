import { createRoot } from 'react-dom/client';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import './styles/index.scss';
import './styles/login-form.scss';
import './styles/error-message.scss';
import './styles/todo-list.scss';
import './styles/filters.scss';

import { App } from './App';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<App />} />
          <Route path="completed" element={<App />} />
          <Route path="active" element={<App />} />
        </Route>
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </Router>,
  );
