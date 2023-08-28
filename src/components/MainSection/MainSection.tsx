import { useTodosContext } from '../../context';
import { TodoList } from '../TodoList/TodoList';

export const MainSection = () => {
  const { toggleAllTodos } = useTodosContext();

  const handleToggleAll = () => {
    toggleAllTodos();
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={() => {
          handleToggleAll();
        }}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  );
};
