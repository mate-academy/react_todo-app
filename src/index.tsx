import { createRoot } from 'react-dom/client';
import {
  HashRouter as Router,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';

import { App } from './App';
import { AuthProvider } from './contexts/AuthContext';
import { ErrorProvider } from './contexts/ErrorContext';

const Root = () => (
  <Router>
    <AuthProvider>
      <ErrorProvider>
        <App />
      </ErrorProvider>
    </AuthProvider>
  </Router>
);

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(<Root />);
