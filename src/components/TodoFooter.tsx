import cn from 'classnames';
import { useTodoContext } from '../context/TodoContext';
import { TodoFilters } from '../types/TodoFilter';

export const TodoFooter = () => {
  const {
    uncompletedTodos,
    todoFilter,
    setTodoFilter,
    completedTodos,
    dispatch,
    newTodoField,
  } = useTodoContext();

  const filterOptions = [
    TodoFilters.all,
    TodoFilters.active,
    TodoFilters.completed,
  ];

  const handleCompleted = () => {
    dispatch({ type: 'clearCompleted' });
    newTodoField.current?.focus();
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {uncompletedTodos.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {filterOptions.map(option => (
          <a
            onClick={() => setTodoFilter(option)}
            key={option}
            href={`#/${option === TodoFilters.all ? '' : option}`}
            className={cn('filter__link', todoFilter === option && 'selected')}
            data-cy={`FilterLink${option}`}
          >
            {option}
          </a>
        ))}
      </nav>

      <button
        onClick={handleCompleted}
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!completedTodos.length}
      >
        Clear completed
      </button>
    </footer>
  );
};
