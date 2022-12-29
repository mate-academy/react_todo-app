import { createRoot } from 'react-dom/client';
import 'bulma/css/bulma.css';
import './styles/index.scss';

import { App } from './App';
import { AuthProvider } from './components/Auth/Auth.Context';

const Root = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(<Root />);
