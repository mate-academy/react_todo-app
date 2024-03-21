/* eslint-disable jsx-a11y/control-has-associated-label */
import { TodosProvider } from './TodosContext';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodosProvider>
        <TodoApp />
      </TodosProvider>
    </div>
  );
};
