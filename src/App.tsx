import { HashRouter } from 'react-router-dom';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => (
  <HashRouter>
    <TodoApp />
  </HashRouter>
);
