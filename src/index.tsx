// import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import { TodosProvider } from './context/TodosContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TodosProvider>
    <App />
  </TodosProvider>,
);
