import { createRoot } from 'react-dom/client';
import {
  HashRouter,
  Route,
  Routes,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import './styles/index.scss';

import { App } from './App';

const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="*" element={<p>Page not found</p>} />
        <Route index element={<App />} />
        <Route path=":filter" element={<App />} />
      </Route>
    </Routes>
  </HashRouter>
);

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(<Root />);
