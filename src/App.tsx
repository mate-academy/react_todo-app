import { TodosProvider } from './services/Store';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <TodoApp />
    </TodosProvider>
  );
};
