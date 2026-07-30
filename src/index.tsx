import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { App } from './App';
import { ContextProvider } from './Context';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <ContextProvider>
    <App />
  </ContextProvider>,
);
