import classNames from 'classnames';
import {
  removeCompleted,
  selectUncompletedCount,
} from '../features/todosSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { FilterOption } from '../types/FilterOption';
import { setFilter } from '../features/filterSlice';

export const TodoFilter = () => {
  const { status } = useAppSelector(state => state.filter);
  const { todos } = useAppSelector(state => state.todos);
  const todosLeft = useAppSelector(selectUncompletedCount);
  const dispatch = useAppDispatch();

  const areCompletedTodos = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosLeft} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(FilterOption).map(option => (
          <a
            key={option}
            href={`#/${option === FilterOption.ALL ? '' : option.toLowerCase()}`}
            className={classNames('filter__link', {
              selected: status === option,
            })}
            data-cy={`FilterLink${option}`}
            onClick={() => dispatch(setFilter(option))}
          >
            {option}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => dispatch(removeCompleted())}
        disabled={!areCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
