import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../../TodosContext/TodosContext';
import { Status } from '../../types/Status';

export const Footer: React.FC = () => {
  const {
    todos, deleteCompletedTodos, filterBy, setFilterBy,
  } = useContext(TodosContext);

  const notCompletedTasksCount = todos.filter(todo => !todo.completed);
  const completedTasksCount = todos.filter(todo => todo.completed);

  const handleDeleteCompleted = () => {
    deleteCompletedTodos();
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${notCompletedTasksCount.length} items left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        <li>
          <a
            href="#/"
            className={classNames({ selected: filterBy === Status.All })}
            onClick={() => setFilterBy(Status.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({ selected: filterBy === Status.Active })}
            onClick={() => setFilterBy(Status.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({ selected: filterBy === Status.Completed })}
            onClick={() => setFilterBy(Status.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {completedTasksCount.length !== 0 ? (
        <button
          type="button"
          className="clear-completed"
          onClick={handleDeleteCompleted}
        >
          Clear completed
        </button>
      ) : ''}
    </footer>
  );
};
