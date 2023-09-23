import { useTodosDispatch, useTodosState } from '../../contexts/TodosContext';
import { Status } from '../../types/Status';
import { TodoList } from '../TodoList';

type Props = {
  filterBy: Status;
};

export const TodoMain: React.FC<Props> = ({ filterBy }) => {
  const todos = useTodosState();
  const dispatch = useTodosDispatch();

  const isAllCompleted = todos.every((todo) => todo.completed);
  const isSomeCompleted = todos.some((todo) => todo.completed);

  const handleCheckboxToggle = () => {
    dispatch({ type: 'toggle all completed status' });
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={handleCheckboxToggle}
        disabled={isSomeCompleted && !isAllCompleted}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList filterBy={filterBy} />
    </section>
  );
};
