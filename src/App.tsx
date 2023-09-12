import { TodosContextProvider } from './TodosContext';
import { TodoApp } from './components/TodoApp';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodosContextProvider>
        <TodoApp />
        <TodoList />
      </TodosContextProvider>
    </div>
  );
};
