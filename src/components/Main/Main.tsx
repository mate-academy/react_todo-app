import { useTodos } from '../../context/TodosContext';
import { TodoList } from '../TodoList';

export const Main: React.FC = () => {
  const { todos, toggleAllTodo } = useTodos();

  return (
    <>
      {todos.length > 0 && (
        <section className="main">
          <input
            onChange={toggleAllTodo}
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
          />

          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList />
        </section>
      )}
    </>
  );
};
