import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';

import { App } from './App';
import { AppProvider } from './components/AppContext';

const Root = () => (
  <Router>
    <AppProvider>
      <App />
    </AppProvider>
  </Router>
);

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(<Root />);
