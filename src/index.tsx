import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { App } from './App';
import { GlobalState } from './components/GlobalState/GlobalState';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalState>
    <App />
  </GlobalState>,
);
