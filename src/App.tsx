import { TodoApp } from './components/TodoApp';
import { TodosProvider } from './store/TodosContext';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <TodoApp />
    </TodosProvider>
  );
};
