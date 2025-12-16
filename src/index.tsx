import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { App } from './App';
import { Providers } from './contexts/Providers';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <Providers>
    <App />
  </Providers>,
);
