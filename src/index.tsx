import { createRoot } from 'react-dom/client';

import './styles/index.scss';
import 'bulma/css/bulma.min.css';

import { App } from './App';
import { GlobalProvider } from './context/TodoContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
);
