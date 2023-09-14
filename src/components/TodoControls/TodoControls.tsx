import React from 'react';
import cn from 'classnames';
import { useTodo } from '../../context/TodoContext';
import { StatusEnum } from '../../types/status.types';
import './TodoControls.css';

const TodoControls: React.FC = () => {
  const {
    removeAllCompleted, setFilter, filter, todos,
  } = useTodo();
  const completedTodoCounter = todos.filter((item) => item.completed).length;
  const activeTodoCounter = todos.filter((item) => !item.completed).length;

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodoCounter} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={
              cn({
                selected: filter === StatusEnum.All,
              })
            }
            onClick={() => setFilter(StatusEnum.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={
              cn({
                selected: filter === StatusEnum.Active,
              })
            }
            onClick={() => setFilter(StatusEnum.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={
              cn({
                selected: filter === StatusEnum.Completed,
              })
            }
            onClick={() => setFilter(StatusEnum.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {completedTodoCounter > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={removeAllCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default TodoControls;
