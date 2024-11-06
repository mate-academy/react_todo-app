import cn from 'classnames';
import { TodoFilter } from '../../types/todo filter';
import './Footer.scss';
import { useContext } from 'react';
import { TodosContext } from '../../services/TodosContext&Provider';
import { useTodo } from '../../services/TodoHooks';

export const Footer: React.FC = () => {
  const { todos, selectedFilter, setSelectedFilter } = useContext(TodosContext);
  const { clearCompleted } = useTodo();

  const activeTodosCount = todos.filter(t => !t.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(TodoFilter).map(filter => (
          <a
            key={filter}
            href={`#/${filter.toLowerCase}`}
            className={cn('filter__link', {
              selected: selectedFilter === filter,
            })}
            data-cy={`FilterLink${filter}`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.every(t => !t.completed)}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
