import classNames from 'classnames';
import { Filter } from '../../types/Filter';
import { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';

const filterLabels: Record<Filter, string> = {
  [Filter.All]: 'All',
  [Filter.Active]: 'Active',
  [Filter.Completed]: 'Completed',
};

export const FooterTodos: React.FC = () => {
  const { todos, filter, clearCompleted, filterSelect } =
    useContext(TodoContext);

  const completedTodos = todos.filter(todo => todo.completed);
  const todosLeft = todos.filter(
    todo => !todo.completed && todo.id !== 0,
  ).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosLeft} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(type => (
          <a
            key={type}
            href={`#/${type.toLowerCase()}`}
            className={classNames('filter__link', {
              selected: filterSelect === type,
            })}
            data-cy={`FilterLink${type}`}
            onClick={() => filter(type)}
          >
            {filterLabels[type]}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearCompleted}
        disabled={completedTodos.length === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
