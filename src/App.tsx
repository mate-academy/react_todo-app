/* eslint-disable jsx-a11y/control-has-associated-label */
import { TodoApp } from './components/TodoApp';
import { TodosProvider } from './context/ToDoContext';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <TodoApp />
    </TodosProvider>
  );
};
