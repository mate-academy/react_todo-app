import { TodosProvider } from './Contexts/TodosContext';
import { TodoApp } from './Components/TodoApp';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <TodoApp />
    </TodosProvider>
  );
};
