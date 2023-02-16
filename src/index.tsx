import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';

import { App } from './App';
import { AuthProvider } from './components/Auth/AuthContext';

const Root = () => (
  <AuthProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </AuthProvider>
);

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(<Root />);
