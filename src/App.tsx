import { TodoApp } from './components/TodoApp';
import { TodosProvider } from './components/TodosContext';

export const App: React.FC = () => (
  <TodosProvider>
    <TodoApp />
  </TodosProvider>
);
