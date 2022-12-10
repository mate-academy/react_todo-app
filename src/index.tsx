import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';

import { App } from './App';
import { AuthProvider } from './components/Auth/AuthContext';

const Root: React.FC = () => (
  <Router>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="active" element={<App />} />
          <Route path="completed" element={<App />} />
        </Route>
      </Routes>
    </AuthProvider>
  </Router>
);

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(<Root />);
