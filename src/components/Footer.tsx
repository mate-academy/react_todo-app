import cn from 'classnames';
import { Filter } from '../types/Filter';
import { useTodos } from '../hooks/useTodos';

type Props = {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
};

export const Footer: React.FC<Props> = ({ filter, onFilterChange }) => {
  const { todos, deleteTodo } = useTodos();

  const isAnyTodosCompleted = todos.some(todo => todo.completed);
  const countOfUncompleted = todos.filter(todo => !todo.completed).length;

  const onClearCompleted = () => {
    todos.forEach(todo => {
      if (todo.completed) {
        deleteTodo(todo.id);
      }
    });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${countOfUncompleted} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.entries(Filter).map(([key, value]) => (
          <a
            key={key}
            href="#/"
            className={cn('filter__link', { selected: filter === value })}
            data-cy={`FilterLink${key}`}
            onClick={() => onFilterChange(value)}
          >
            {key}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!isAnyTodosCompleted}
        onClick={onClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
