import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { App } from './App';
import { GlobalStateProvader } from './context/Store';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalStateProvader>
    <App />
  </GlobalStateProvader>,
);
