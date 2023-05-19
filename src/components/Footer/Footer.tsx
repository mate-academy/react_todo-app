import { FC } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';
import { SearchLink } from '../SearchLink';

type Props = {
  todos: Todo[];
  status: Filter | null;
  removeTodo: (todoId: number) => void;
};

export const Footer: FC<Props> = ({
  todos,
  status,
  removeTodo,
}) => {
  const filterNames = Object.values(Filter);

  const activeTodos = todos.filter(todo => !todo.completed);

  const handleClearCompleted = () => {
    todos.forEach(todo => {
      if (todo.completed) {
        removeTodo(todo.id);
      }
    });
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeTodos.length} item${activeTodos.length > 1 ? 's' : ''} left`}
      </span>

      <nav className="filter">
        {filterNames.map(filterName => (
          <SearchLink
            key={filterName}
            params={filterName === Filter.ALL
              ? { status: null }
              : { status: filterName }}
            className={classNames('filter__link', {
              selected: filterName === 'All'
                ? status === null
                : status === filterName,
            })}
          >
            {filterName}
          </SearchLink>
        ))}
      </nav>

      <button
        type="button"
        className={classNames('todoapp__clear-completed', {
          hidden: todos.every(todo => !todo.completed),
        })}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
