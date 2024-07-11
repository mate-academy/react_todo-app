import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { App } from './App';
import { StoreProvider } from './store';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <StoreProvider>
    <App />
  </StoreProvider>,
);
