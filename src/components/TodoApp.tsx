import { useContext } from 'react';
import { Header } from './Header';
import { TodoList } from './TodoList';
import { TodosContext } from '../context/TodosContext';
import { Footer } from './Footer';

export const TodoApp: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList />

        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};
