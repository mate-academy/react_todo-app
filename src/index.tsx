import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { TodosProvider } from './TodoContext';

import './styles/index.scss';
import './styles/todo-list.scss';
import './styles/filters.scss';

import { AppContainer } from './AppContainer';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <TodosProvider>
        <AppContainer />
      </TodosProvider>
    </Router>,
  );
