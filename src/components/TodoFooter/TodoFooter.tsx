import React, { useContext } from 'react';
import classNames from 'classnames';
import { Status } from '../../types/Status';
import { TodosContext } from '../../contexts/TodosContext';

type Props = {
  filter: Status;
  setFilter: (filter: Status) => void ;
};

export const TodoFooter: React.FC<Props> = ({ filter, setFilter }) => {

  const {
    todos,
    clearCompleted,
  } = useContext(TodosContext);

  const applyFilter = (value: Status) => () => setFilter(value);

  const handleClearCompleted = () => {
    clearCompleted();
  };

  const itemsLeft = todos.filter(el => !el.completed).length;
  const hasCompletedTodos = todos.some((todo) => todo.completed);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${itemsLeft} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames({
              selected: filter === Status.All,
            })}
            onClick={applyFilter(Status.All)}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/active"
            className={classNames({
              selected: filter === Status.Active,
            })}
            onClick={applyFilter(Status.Active)}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/completed"
            className={classNames({
              selected: filter === Status.Completed,
            })}
            onClick={applyFilter(Status.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {hasCompletedTodos && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
