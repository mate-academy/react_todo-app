import React, { useContext } from 'react';
import cn from 'classnames';
import { StatusTodoList, TodoContext } from '../context/todo.context';

const TodoFooter: React.FC = () => {
  const {
    statusTodoList,
    changeStatusTodoList,
    todosStats,
    clearTodos,
  } = useContext(TodoContext);

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {`${todosStats.todosLeft} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={cn({
              selected: statusTodoList === StatusTodoList.All,
            })}
            onClick={() => changeStatusTodoList(StatusTodoList.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn({
              selected: statusTodoList === StatusTodoList.Active,
            })}
            onClick={() => changeStatusTodoList(StatusTodoList.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn({
              selected: statusTodoList === StatusTodoList.Completed,
            })}
            onClick={() => changeStatusTodoList(StatusTodoList.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {
        todosStats.todosCompleted && (
          <button
            type="button"
            className="clear-completed"
            onClick={() => clearTodos()}
          >
            Clear completed
          </button>
        )
      }
    </footer>
  );
};

export default TodoFooter;
