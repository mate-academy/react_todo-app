import { createRoot } from 'react-dom/client';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { Todos } from './components/Todos';
import { TodosProvider } from './components/TodosContext';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <TodosProvider>
    <HashRouter>
      <Routes>
        <Route path="*" element={<h1 className="title">Page not found</h1>} />
        <Route path="/" element={<App />}>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />

          <Route index element={<Todos />} />
          <Route path=":filter" element={<Todos />} />
        </Route>
      </Routes>
    </HashRouter>
  </TodosProvider>,

);
