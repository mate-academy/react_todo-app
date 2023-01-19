import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { App } from './App';
import { AuthProvider } from './Auth/AuthContext';

const Root = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(<Root />);
