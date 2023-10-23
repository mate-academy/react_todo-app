/* eslint-disable jsx-a11y/control-has-associated-label */

import { TodoApp } from './components/TodoApp';
import { TodoProvider } from './components/TodoContext';

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
};
