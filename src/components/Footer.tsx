import React, { useContext } from 'react';
import cn from 'classnames';
import { TodosContext } from '../TodosContext';
import { Option } from '../types/Option';

export const Footer: React.FC = () => {
  const {
    todos,
    setTodos,
    filter,
    setFilter,
  } = useContext(TodosContext);

  const TotalUncompletedTodos = todos.filter(todo => !todo.completed);

  const isCompletedTodos = todos.some(todo => todo.completed);

  const cleanCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {`${TotalUncompletedTodos.length} ${TotalUncompletedTodos.length === 1 ? 'item' : 'items'} left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={cn({
              selected: filter === Option.All,
            })}
            onClick={() => setFilter(Option.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn({
              selected: filter === Option.Active,
            })}
            onClick={() => setFilter(Option.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn({
              selected: filter === Option.Completed,
            })}
            onClick={() => setFilter(Option.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>
      {isCompletedTodos && (
        <button
          type="button"
          className="clear-completed"
          onClick={cleanCompletedTodos}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
