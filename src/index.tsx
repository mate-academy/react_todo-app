import { createRoot } from 'react-dom/client';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import {
  HashRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import { App } from './App';
import { ErrorPage } from './components/ErrorPage';

const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/">
        <Route index element={<App />} />
        <Route path=":filter" element={<App />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </HashRouter>
);

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(<Root />);
