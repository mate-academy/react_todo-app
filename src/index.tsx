import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';

import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import { AuthProvider } from './context';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>,
  );
