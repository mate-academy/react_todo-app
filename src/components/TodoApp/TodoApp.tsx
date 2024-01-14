import { useContext } from 'react';
import { TodosContext } from '../TodosContext/TodosContext';
import { TodoList } from '../TodoList';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export const TodoApp: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <Header />

      {todos.length > 0 && (
        <TodoList todos={todos} />
      )}

      {todos.length > 0 && (
        <Footer />
      )}
    </div>
  );
};
