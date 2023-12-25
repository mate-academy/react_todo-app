import { createRoot } from 'react-dom/client';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App';
import { MyContextProvider } from './TodosContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <MyContextProvider><App /></MyContextProvider>,
);
