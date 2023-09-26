import classNames from 'classnames';
import { TodoList } from '../TodoList/TodoList';

type Props = {
  isAllCompleted: boolean;
  handleChangeStatusTodos: () => void,
};

export const Section: React.FC<Props> = ({
  isAllCompleted,
  handleChangeStatusTodos,
}) => {
  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className={classNames('toggle-all', {
          active: !isAllCompleted,
        })}
        data-cy="toggleAll"
        checked={isAllCompleted}
        onChange={handleChangeStatusTodos}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  );
};
