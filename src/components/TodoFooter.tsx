import React from 'react';
import { Filter } from '../App';
import classNames from 'classnames';
import { useTodoContext } from '../TodoContext';

export const TodoFooter: React.FC = () => {
  const { todos, handleClearCompleted, filter, setFilter, todoLeft } =
    useTodoContext();

  const handleCompletedTodos = todos.some(todo => todo.completed);
  const filters = Object.values(Filter);

  return (
    todos.length > 0 && (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {todoLeft} items left
        </span>

        <nav className="filter" data-cy="Filter">
          {filters.map(type => (
            <a
              key={type}
              href={`#/${type === Filter.All ? '' : type.toLowerCase()}`}
              className={classNames('filter__link', {
                selected: filter === type,
              })}
              data-cy={`FilterLink${type}`}
              onClick={() => setFilter(type)}
            >
              {type}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={handleClearCompleted}
          disabled={!handleCompletedTodos}
        >
          Clear completed
        </button>
      </footer>
    )
  );
};
