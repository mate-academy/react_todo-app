import { createRoot } from 'react-dom/client';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';

import { AuthProvider } from './components/Auth/AuthContext';
import { App } from './App';

const Root = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path=":todoStatus" element={<App />} />
        </Route>
      </Routes>
    </Router>
  </AuthProvider>
);

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(<Root />);
