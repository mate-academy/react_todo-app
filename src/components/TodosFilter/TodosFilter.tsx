import { FC } from 'react';
import { Status } from '../../types/Status';
import { FilterLink } from '../FilterLink';

type Props = {
  completedTodosCount: number;
  activeTodosCount: number;
  deleteTodos: () => void;
};

export const TodosFilter: FC<Props> = ({
  completedTodosCount,
  activeTodosCount,
  deleteTodos,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodosCount} ${activeTodosCount > 1 ? 'items' : 'item'} left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        <FilterLink to="/" title={Status.All} />
        <FilterLink to="/active" title={Status.Active} />
        <FilterLink to="/completed" title={Status.Completed} />
      </ul>

      {!!completedTodosCount && (
        <button type="button" className="clear-completed" onClick={deleteTodos}>
          Clear completed
        </button>
      )}
    </footer>
  );
};
