import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';

import { App } from './App';
import { ActiveLinkProvider } from './context/ActiveLinkContext';
import { TodosProvider } from './context/TodosContext';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <TodosProvider>
    <ActiveLinkProvider>
      <App />
    </ActiveLinkProvider>
  </TodosProvider>,
);
