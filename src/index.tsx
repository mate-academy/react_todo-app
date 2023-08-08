import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(<Root />);
