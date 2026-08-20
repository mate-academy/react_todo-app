import { useDispatch, useGlobalState } from '../../context/Context';
import { FILTERS } from '../../context/types';
import { FilterLink } from './FilterLink';

export const TodoFilter = () => {
  const { todos, activeFilter } = useGlobalState();
  const dispatch = useDispatch();
  const completedTodos = todos.reduce(
    (count, todo) => count + Number(todo.completed),
    0,
  );
  const leftTodos = todos.length - completedTodos;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${leftTodos} ${leftTodos === 1 ? 'item' : 'items'} left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {FILTERS.map(filter => (
          <FilterLink
            key={filter}
            isActive={filter === activeFilter}
            filter={filter}
            onFilterChange={() => {
              dispatch({ type: 'setFilter', payload: filter });
            }}
          />
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodos === 0}
        onClick={() => dispatch({ type: 'clearCompleted' })}
      >
        Clear completed
      </button>
    </footer>
  );
};
