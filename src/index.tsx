import { createRoot } from 'react-dom/client';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';
import { App } from './components/App';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(<App />);
