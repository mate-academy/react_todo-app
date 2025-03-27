import { Filter, useTodoContext } from '../../TodoContext';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const { todos, setTodos, filter, setFilter } = useTodoContext();

  const leftTodos = todos.filter(todo => !todo.completed).length;

  const clearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {leftTodos} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(value => (
          <a
            href={`#/${value}`}
            className={classNames('filter__link', {
              selected: filter === value,
            })}
            data-cy={`FilterLink${value}`}
            key={value}
            onClick={() => {
              window.location.hash = `#/${value}`;
              setFilter(value);
            }}
          >
            {value}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => clearCompleted()}
        disabled={leftTodos === todos.length}
      >
        Clear completed
      </button>
    </footer>
  );
};
