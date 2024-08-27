import { createRoot } from 'react-dom/client';

import './styles/index.css';

import { App } from './App';
import { GlobalProvider } from './context/GlobalProvider';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
);
