/* eslint-disable jsx-a11y/control-has-associated-label */
import { TodoApp } from './components/TodoApp';
import { TodosProvider } from './components/todosContext';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <TodoApp />
    </TodosProvider>
  );
};
