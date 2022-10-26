import { createRoot } from 'react-dom/client';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App';

const Root = () => (
  <App />
);

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(<Root />);
