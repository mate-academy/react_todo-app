import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import './styles/index.scss';

import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from './App';
import { AuthProvider } from './components/AuthContext';

const Root = () => (
  <AuthProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </AuthProvider>
);

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(<Root />);
