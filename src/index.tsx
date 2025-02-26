import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { App } from './App';
import { AppContextProvider } from './context/Context';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <AppContextProvider>
    <App />
  </AppContextProvider>,
);
