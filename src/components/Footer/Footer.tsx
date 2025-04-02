import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { CompleteStatus } from '../../types/CompleteStatus.enum';

type Props = {
  filter: string;
  onFilter: (v: CompleteStatus) => void;
  activeTodosCount: number;
  complitedTodos: Todo[];
  onDelete: (v: number[]) => void;
};

export const Footer: React.FC<Props> = ({
  filter,
  onFilter,
  activeTodosCount,
  complitedTodos,
  onDelete,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filter === CompleteStatus.ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={() => onFilter(CompleteStatus.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filter === CompleteStatus.ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={() => onFilter(CompleteStatus.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filter === CompleteStatus.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onFilter(CompleteStatus.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!complitedTodos.length}
        onClick={() => {
          onDelete(complitedTodos.map(todo => todo.id));
          // complitedTodos.map(todo => {
          //   onDelete(todo.id);
          // });
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
