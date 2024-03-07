import { TodoApp } from './Components/TodoApp';
import { TodosProvider } from './Context/TodosContext';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <TodoApp />
    </TodosProvider>
  );
};
