import { createRoot } from 'react-dom/client';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { HashRouter } from 'react-router-dom';
import { App } from './App';
import { MyContextProvider } from './TodosContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <MyContextProvider><HashRouter><App /></HashRouter></MyContextProvider>,
);
