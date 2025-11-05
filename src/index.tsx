import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { App } from './App';
import { GlobalContextProvider } from './store/Store';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>,
);
