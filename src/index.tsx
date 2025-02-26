import { createRoot } from 'react-dom/client';
import { GlobalStateProvider } from './context/StateContext';

import './styles/index.scss';

import { App } from './App';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>,
);
