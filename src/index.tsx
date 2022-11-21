import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App';
import { AuthProvider } from './components/Auth/AuthContext';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={(
            <AuthProvider>
              <App />
            </AuthProvider>
          )}
        />
        <Route
          path="/:filter"
          element={(
            <AuthProvider>
              <App />
            </AuthProvider>
          )}
        />
      </Routes>
    </HashRouter>,
  );
