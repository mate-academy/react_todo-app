import React, { useContext } from 'react';
import cn from 'classnames';
import { TodosContext } from '../../TodosContext';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

type Props = {};

export const TodosFilter: React.FC<Props> = () => {
  const {
    todos, setTodos, numberOfNotCompleted, filter, setFilter,
  }
  = useContext(TodosContext);

  const clearCompletedTodos = (currentTodos: Todo[]) => {
    setTodos(currentTodos.filter(todo => !todo.completed));
  };

  if (todos.length) {
    return (
      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${numberOfNotCompleted} items left`}
        </span>

        <ul className="filters" data-cy="todosFilter">
          <li>
            <a
              href="#/"
              onClick={() => setFilter(Status.All)}
              className={cn({
                selected: filter === Status.All,
              })}
            >
              All
            </a>
          </li>

          <li>
            <a
              href="#/active"
              onClick={() => setFilter(Status.Active)}
              className={cn({
                selected: filter === Status.Active,
              })}
            >
              Active
            </a>
          </li>

          <li>
            <a
              href="#/completed"
              onClick={() => setFilter(Status.Completed)}
              className={cn({
                selected: filter === Status.Completed,
              })}
            >
              Completed
            </a>
          </li>
        </ul>
        {(todos.length - numberOfNotCompleted) > 0 && (
          <button
            type="button"
            className="clear-completed"
            onClick={() => clearCompletedTodos(todos)}
          >
            Clear completed
          </button>
        )}
      </footer>
    );
  }

  return null;
};
