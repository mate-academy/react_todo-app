import { createRoot } from 'react-dom/client';

import './styles/index.scss';
// import './styles/todo-list.css';
// import './styles/filters.css';

import { App } from './App';
import { MyProvider } from './context/context';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <MyProvider>
    <App />
  </MyProvider>,
);
