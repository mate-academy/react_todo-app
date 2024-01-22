import { TodoApp } from './components/TodoApp/TodoApp';
import { TodoProvider } from './contextes/TodosContext';

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
};
