import { createRoot } from 'react-dom/client';

import { App } from './App';

import './styles/index.scss';
import './styles/todo.scss';
import './styles/todoapp.scss';
import './styles/filter.scss';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(<App />);
