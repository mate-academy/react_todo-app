import { useContext, useMemo } from 'react';
import cn from 'classnames';
import { TodoContext } from '../../context/TodoContext';
import { Filter } from '../../types/Filter';

type Props = {
  onFilterChange: (filter: Filter) => void;
  onClearCompleted: () => void;
  filter: Filter;
};

export const TodoFooter: React.FC<Props> = ({
  onFilterChange,
  filter,
  onClearCompleted,
}) => {
  const { todos } = useContext(TodoContext);

  const filterButtons = useMemo((
    () => [...Object.values(Filter)]
  ), []);

  const uncompletedTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.filter(todo => todo.completed).length;

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${uncompletedTodos} items left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        {filterButtons.map(button => (
          <li
            key={button}
          >
            <a
              href={`#/${button === Filter.All ? '' : `${button}`}`}
              className={cn({ selected: button === filter })}
              onClick={() => onFilterChange(button)}
            >
              {`${button.charAt(0).toLocaleUpperCase() + button.slice(1)}`}
            </a>
          </li>
        ))}
      </ul>

      {completedTodos > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => onClearCompleted()}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
