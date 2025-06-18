import { createRoot } from 'react-dom/client';

import './styles/index.scss';
// import 'bulma/css/bulma.css';

import { App } from './App';
import { GlobalProvider } from './globalProvider';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
);
