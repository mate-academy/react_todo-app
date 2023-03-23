import { createRoot } from 'react-dom/client';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import {
  HashRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from './App';

const Root = () => (
  <HashRouter>
    <Routes>
      <Route
        path="*"
        element={<h1>Page not found</h1>}
      />

      <Route path="/">
        <Route
          index
          element={<App />}
        />

        <Route
          path=":filter"
          element={<App />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Route>
    </Routes>
  </HashRouter>
);

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(<Root />);
