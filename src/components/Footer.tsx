import { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';
import { Filter } from '../types/Filter';
import cls from 'classnames';

export const Footer: React.FC = () => {
  const { todos, setFilter, filter, clearCompleted } = useContext(TodosContext);

  const itemsLeft = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.filter(todo => todo.completed).length;

  const links = Object.values(Filter);
  const itemsLeftText = `${itemsLeft} item${itemsLeft !== 1 ? 's' : ''} left`;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {itemsLeftText}
      </span>

      <nav className="filter" data-cy="Filter">
        {links.map(link => (
          <a
            href={`#/${link === Filter.All ? '' : link}`}
            key={link}
            className={cls('filter__link', { selected: filter === link })}
            data-cy={`FilterLink${link.charAt(0).toUpperCase() + link.slice(1)}`}
            onClick={() => {
              setFilter(link as Filter);
            }}
          >
            {link.charAt(0).toUpperCase() + link.slice(1)}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearCompleted}
        disabled={completedTodos === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
