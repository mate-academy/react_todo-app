import { Todos } from './components/Todo/Todos';
import { TodosProvider } from './context/TodoContext';

export const App = () => (
  <TodosProvider>
    <Todos />
  </TodosProvider>
);
