import { createRoot } from 'react-dom/client';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';
import './styles/authForm.css';
import { HashRouter } from 'react-router-dom';
import { App } from './App';
import { AuthProvider } from './components/Auth/AuthContext';
import { AppProvider } from './components/AppContext/AppContext';

const Root = () => (
  <HashRouter>
    <AuthProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </AuthProvider>
  </HashRouter>
);

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(<Root />);
