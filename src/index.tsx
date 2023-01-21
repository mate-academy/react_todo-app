import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';

import { App } from './App';
import { AuthProvider } from './components/Auth/AuthContext';
import { DefaultProvider } from './components/DefaultContext';
import { ErrorProvider } from './components/ErrorNotification/ErrorContext';

const Root = () => (
  <AuthProvider>
    <ErrorProvider>
      <DefaultProvider>
        <App />
      </DefaultProvider>
    </ErrorProvider>
  </AuthProvider>
);

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(<Root />);
