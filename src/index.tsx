// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App';

const Root = () => <App />;

createRoot(document.getElementById('root') as HTMLDivElement).render(<Root />);
