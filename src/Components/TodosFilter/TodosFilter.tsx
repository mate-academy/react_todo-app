import React, { useContext } from 'react';
import classNames from 'classnames';

import { TodoContext } from '../../contexts/TodoContext';

export const TodosFilter: React.FC = () => {
  const {
    todoList,
    dispatch,
    filter,
    setFilter,
  } = useContext(TodoContext);

  const todoLeft = todoList.filter(todo => todo.completed === false).length;
  const todoCompleted = todoList.filter(todo => todo.completed === true).length;

  return (
    <>
      <span className="todo-count" data-cy="todosCounter">
        {`${todoLeft} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames({
              selected: filter === '',
            })}
            onClick={() => setFilter('')}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({
              selected: filter === 'active',
            })}
            onClick={() => setFilter('active')}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({
              selected: filter === 'completed',
            })}
            onClick={() => setFilter('completed')}
          >
            Completed
          </a>
        </li>
      </ul>

      {
        !!todoCompleted && (
          <button
            type="button"
            className="clear-completed"
            onClick={() => dispatch({ type: 'destroyCompletedTodo' })}
          >
            Clear completed
          </button>
        )
      }
    </>
  );
};
