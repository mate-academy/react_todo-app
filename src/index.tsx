import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';

import { App } from './App';
import { TodosProvider } from './contexts/Todos.context';

createRoot(document.getElementById('root') as HTMLDivElement).render(
    <TodosProvider>
        <App />
    </TodosProvider>
);
