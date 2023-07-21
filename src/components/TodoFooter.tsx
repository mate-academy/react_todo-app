/* eslint-disable react/jsx-one-expression-per-line */
import classNames from 'classnames';
import React from 'react';
import { useTodoContext } from '../hooks/useTodoContext';
import { TodoStatus } from '../types/Todo';

const TodoFooter: React.FC = () => {
  const {
    activeTodos,
    completedTodos,
    selectedStatus,
    handleSelectedStatus,
    handleDeleteCompleted,
  } = useTodoContext();

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {activeTodos} items left
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames({
              selected: selectedStatus === TodoStatus.All,
            })}
            onClick={() => handleSelectedStatus(TodoStatus.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({
              selected: selectedStatus === TodoStatus.Active,
            })}
            onClick={() => handleSelectedStatus(TodoStatus.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({
              selected: selectedStatus === TodoStatus.Completed,
            })}
            onClick={() => handleSelectedStatus(TodoStatus.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {completedTodos.length > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleDeleteCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default TodoFooter;
