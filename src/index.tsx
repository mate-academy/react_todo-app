import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App';

const element = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(element!);

root.render(
  <HashRouter>
    <Routes>
      <Route path="/">
        <Route index element={<App />} />
        <Route path=":filterCriteria" element={<App />} />
      </Route>
    </Routes>
    {/* <App /> */}
  </HashRouter>,
);
