import { useMyContext } from '../TodosContext';
import { TodoList } from './TodoList';

export const Main = () => {
  const { todos, allCompleted, setAll } = useMyContext();

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={allCompleted()}
        onChange={setAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList todos={todos} />
    </section>
  );
};
