import './styles/index.scss';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { GlobalStateProvider } from './GlobalStateProvider';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>,
);
