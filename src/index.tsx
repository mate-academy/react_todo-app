import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';
import './styles/auth-form.css';

import { App } from './App';
import { AuthProvider } from './components/Auth/AuthContext';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>,
  );
