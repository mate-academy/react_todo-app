import { FilterStatus } from '../../App';

type Props = {
  count: number;
  changeStatusOfTodos: (value: FilterStatus) => void;
  clearCompletedTodo: () => void;
};

export const Footer: React.FC<Props> = ({
  count,
  changeStatusOfTodos,
  clearCompletedTodo,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {count} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className="filter__link selected"
          data-cy="FilterLinkAll"
          onClick={() => changeStatusOfTodos(FilterStatus.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className="filter__link"
          data-cy="FilterLinkActive"
          onClick={() => changeStatusOfTodos(FilterStatus.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className="filter__link"
          data-cy="FilterLinkCompleted"
          onClick={() => changeStatusOfTodos(FilterStatus.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => clearCompletedTodo()}
      >
        Clear completed
      </button>
    </footer>
  );
};
