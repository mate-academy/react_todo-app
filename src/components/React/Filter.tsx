import { Todo } from '../../types/Todo';
import { FilterBar } from './FilterBar';
import { Status } from '../../enums/Status';

type Props = {
  todos: Todo[],
  onCompletedClear: () => void,
};

export const Filter: React.FC<Props> = ({
  todos,
  onCompletedClear,
}) => {
  const activeTodos = todos.filter(todo => !todo.completed).length;
  const isCompletedTodo = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <FilterBar to="/">{Status.All}</FilterBar>

        <FilterBar data-cy="FilterLinkActive" to="/active">
          {Status.Active}
        </FilterBar>

        <FilterBar data-cy="FilterLinkCompleted" to="/completed">
          {Status.Completed}
        </FilterBar>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        onClick={() => onCompletedClear()}
        style={!isCompletedTodo ? { visibility: 'hidden' } : {}}
      >
        Clear completed
      </button>
    </footer>
  );
};
