import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App';

const root = createRoot((document.getElementById('root') as HTMLDivElement));

root.render(
  <Router>
    <Routes>
      <Route path="/">
        <Route index element={<App />} />
        <Route path=":status" element={<App />} />
      </Route>
    </Routes>
  </Router>,
);
