import { createRoot } from 'react-dom/client';
import { TodosProvider } from './context/ToDosContext';
import { App } from './App';

import './styles/index.scss';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodosProvider>
    <App />
  </TodosProvider>,
);
