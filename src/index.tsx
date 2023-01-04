import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';

import { HashRouter } from 'react-router-dom';
import { App } from './App';
import { AuthProvider } from './components/Auth/AuthContext';
import { TextErrorProvider } from './components/Context/ContextTextError';
import { ContextTodosProvider } from './components/Context/ContextTodos';
import {
  ContextToggleAllProvider,
} from './components/Context/ContextToggleAll';

const Root = () => (
  <HashRouter>
    <AuthProvider>
      <TextErrorProvider>
        <ContextTodosProvider>
          <ContextToggleAllProvider>
            <App />
          </ContextToggleAllProvider>
        </ContextTodosProvider>
      </TextErrorProvider>
    </AuthProvider>
  </HashRouter>
);

createRoot(document.getElementById('root') as HTMLDivElement).render(<Root />);
