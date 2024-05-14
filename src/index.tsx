import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { App } from './App';
import { GlobalStateProvider } from './storage/Storage';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>,
);
