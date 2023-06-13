import { Status } from '../../types/Status';
import { TodoFilter } from '../TodoFilter/TodoFilter';

type Props = {
  countNotCompleted: number,
  hasCompleted: boolean,
  filterType: Status,
  setFilterType: (value: Status) => void,
  handleClearCompleted: () => void,
};

export const Footer: React.FC<Props> = ({
  countNotCompleted,
  hasCompleted,
  filterType,
  setFilterType,
  handleClearCompleted,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${countNotCompleted} items left`}
      </span>

      <TodoFilter
        filterType={filterType}
        setFilterType={setFilterType}
      />

      {hasCompleted
        && (
          <button
            type="button"
            className="clear-completed"
            onClick={handleClearCompleted}
          >
            Clear completed
          </button>
        )}
    </footer>
  );
};
