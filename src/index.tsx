import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';

import { App } from './App';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';

const Root: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={<App />}
        >
          <Route
            path=":filterType"
            element={<App />}
          />
        </Route>
      </Routes>
    </HashRouter>
  );
};

const root = createRoot(document.getElementById('root') as HTMLDivElement);

root.render(<Root />);
