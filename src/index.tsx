import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';

// import 'bulma/css/bulma.css';
import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <HashRouter>
    <Routes>
      <Route>
        <Route index element={<App />} />
        <Route path=":filterBy" element={<App />} />
      </Route>
    </Routes>
  </HashRouter>,
);
