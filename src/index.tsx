import { createRoot } from 'react-dom/client';
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.css';
import './styles/filters.css';
import './styles/todo-list.css';

import { App } from './App';
import { AuthProvider } from './components/Auth';

const Root = () => (
  <AuthProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<h1>Page not found</h1>} />
          <Route path="/:filterParam" element={<App />} />
        </Route>
      </Routes>
    </HashRouter>
  </AuthProvider>
);

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(<Root />);
