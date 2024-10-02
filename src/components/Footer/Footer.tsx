import classNames from 'classnames';
import { Filter } from '../../type/Filter';
import { useContext } from 'react';
import { TodosContext } from '../TodosContext/TodosContext';

export const Footer: React.FC = () => {
  const { todos, setTodos, filter, setFilter } = useContext(TodosContext);
  const activeItems = todos.filter(item => !item.completed);
  const completed = todos.filter(item => item.completed);

  const text = `${activeItems.length} item${activeItems.length === 1 ? '' : 's'} left`;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {text}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(item => (
          <a
            key={item}
            href={`#/${item.toLowerCase()}`}
            className={classNames('filter__link', {
              selected: filter === item,
            })}
            data-cy={`FilterLink${item}`}
            onClick={() => setFilter(item)}
          >
            {item}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completed.length === 0}
        onClick={() => setTodos(activeItems)}
      >
        Clear completed
      </button>
    </footer>
  );
};
