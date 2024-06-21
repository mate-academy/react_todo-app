import { createRoot } from 'react-dom/client';

import './styles/index.scss';
import './components/TodoItem/todo.scss';
import './components/TodoList/filter.scss';
import './styles/todoapp.scss';

import { App } from './App';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(<App />);
