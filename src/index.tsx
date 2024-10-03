import { createRoot } from 'react-dom/client';
import '../src/styles/index.scss';
import '../src/styles/filter.scss';
import '../src/styles/todo.scss';
import '../src/styles/todoapp.scss';

import { App } from './App';
import { GlobalProvider } from './utils/GlobalContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
);
