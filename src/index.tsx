import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';

import { App } from './App';
import { ErrorProvider } from './contexts/ErrorContext';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <ErrorProvider>
    <App />
  </ErrorProvider>,
);
