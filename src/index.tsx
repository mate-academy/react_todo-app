import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';

import { App } from './App';
import { AuthUserProvider } from './components/Auth/AuthUserContext';

const Root: React.FC = () => (
  <Router>
    <AuthUserProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="active" element={<App />} />
          <Route path="completed" element={<App />} />
        </Route>
      </Routes>
    </AuthUserProvider>
  </Router>
);

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(<Root />);
