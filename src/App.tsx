import { TodoApp } from './components/TodoApp';
import { TodosProvider } from './components/Context';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <TodoApp />
    </TodosProvider>
  );
};
