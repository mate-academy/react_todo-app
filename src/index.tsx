import { createRoot } from 'react-dom/client';

import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.css';
import './styles/filters.css';
import './styles/todo-list.css';

import { App } from './App';
import { AuthProvider } from './components/Auth';

const Root = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(<Root />);
