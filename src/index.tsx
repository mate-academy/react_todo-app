import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';

import { App } from './App';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/">
        <Route index element={<App />} />
        <Route path=":filter" element={<App />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </HashRouter>
);

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(<Root />);
