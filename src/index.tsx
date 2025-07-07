import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { App } from './App';
import { GlobalProvider } from './Context/state';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
);
