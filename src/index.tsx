import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import './styles/index.scss';

import { App } from './components/App/App';
import { AuthProvider } from './components/Auth/AuthContext';

const Root = () => (
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(<Root />);
