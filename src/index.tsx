import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { GlobalProvider } from './GlobalProvider';
import { App } from './App';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
);
