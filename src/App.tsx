import { TodoContextProvider } from './context/TodoContext';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => {
  return (
    <TodoContextProvider>
      <TodoApp />
    </TodoContextProvider>
  );
};
