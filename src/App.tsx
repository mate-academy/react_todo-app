import { TodoApp } from './components/TodoApp/TodoApp';
import { TodosContextProvider } from './context/TodosContext';

export const App: React.FC = () => {
  return (
    <TodosContextProvider>
      <TodoApp />
    </TodosContextProvider>
  );
};
