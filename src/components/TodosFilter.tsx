import { SortBy, Todo } from '../types';

type Props = {
  handleSetSortBy: (value:SortBy) => void,
  sortBy: SortBy,
  deleteCompletedTodos: () => void,
  completedTodosId: number[];
  todosList: Todo[]
};

export const TodosFilter: React.FC<Props> = ({
  handleSetSortBy,
  sortBy,
  deleteCompletedTodos,
  completedTodosId,
  todosList,
}) => (
  <footer className="footer">
    <span className="todo-count" data-cy="todosCounter">
      {`${todosList.length - completedTodosId.length} items left`}
    </span>

    <ul className="filters">
      <li>
        <a
          href="#/"
          className={sortBy === SortBy.all
            ? 'selected'
            : ''}
          onClick={() => handleSetSortBy(SortBy.all)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={sortBy === SortBy.active
            ? 'selected'
            : ''}
          onClick={() => handleSetSortBy(SortBy.active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={sortBy === SortBy.completed
            ? 'selected'
            : ''}
          onClick={() => handleSetSortBy(SortBy.completed)}
        >
          Completed
        </a>
      </li>
    </ul>

    <button
      type="button"
      className="clear-completed"
      onClick={deleteCompletedTodos}
      disabled={completedTodosId.length === 0}
      style={{ opacity: completedTodosId.length === 0 ? 0 : 1 }}
    >
      Clear completed
    </button>
  </footer>
);
