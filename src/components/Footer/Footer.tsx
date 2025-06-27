import cn from 'classnames';
import { FILTERS } from '../../utils/constants';
import { useContext } from 'react';
import { TodosContext } from '../../context/TodoContext';

type Props = {
  completedCount: number;
  filtredField: FILTERS;
  onFilter: (filtr: FILTERS) => void;
};

export const Footer: React.FC<Props> = ({
  completedCount,
  filtredField,
  onFilter,
}) => {
  const { todos, setTodos } = useContext(TodosContext);

  const deleteCompleted = () => {
    setTodos(prev => prev.filter(t => !t.completed));
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.length - completedCount} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(FILTERS).map(field => (
          <a
            key={field}
            href="#/"
            className={cn('filter__link', {
              selected: filtredField === field,
            })}
            data-cy={`FilterLink${field}`}
            onClick={() => onFilter(field)}
          >
            {field}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => deleteCompleted()}
        disabled={completedCount === 0 ? true : false}
      >
        Clear completed
      </button>
    </footer>
  );
};
