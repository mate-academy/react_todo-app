import { createRoot } from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';

import { App } from './App';
import { GlobalProvider } from './state/State';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
);
