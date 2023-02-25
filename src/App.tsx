import { HashRouter } from 'react-router-dom';
import { TodoApp } from './components/TodoApp';

export const App = () => {
  return (
    <HashRouter>
      <TodoApp />
    </HashRouter>
  );
};
