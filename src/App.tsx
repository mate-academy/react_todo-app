/* eslint-disable jsx-a11y/control-has-associated-label */
import { TodoApp } from './components/TodoApp/TodoApp';
import { TodosProvider } from './TodosContext/TodosContext';

export const App = () => {
  return (
    <TodosProvider>
      <TodoApp />
    </TodosProvider>
  );
};
