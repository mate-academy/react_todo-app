import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';

import { App } from './App';
import { ActiveLinkProvider } from './context/ActiveLinkContext';
import { TodosProvider } from './context/TodosContext';
import { FocusProvider } from './context/FocusContext';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <TodosProvider>
    <ActiveLinkProvider>
      <FocusProvider>
        <App />
      </FocusProvider>
    </ActiveLinkProvider>
  </TodosProvider>,
);
