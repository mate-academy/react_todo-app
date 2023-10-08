import React, { useContext } from 'react';
import cn from 'classnames';

import { filtredButtons } from '../api/filterButtons';
import { TodosContext } from '../context/TodosContext';

export const TodosFilter: React.FC = () => {
  const {
    todos,
    leftTodo,
    filterParam,
    setFilterParams,
    clearCompleted,
  } = useContext(TodosContext);

  return (
    <>
      {(todos.length > 0) && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {leftTodo === 1 ? '1 item left' : `${leftTodo} items left`}
          </span>

          <ul className="filters">
            {filtredButtons.map(button => (
              <li key={button.name}>
                <a
                  href={button.href}
                  className={cn({ selected: button.name === filterParam })}
                  onClick={() => setFilterParams(button.name)}
                >
                  {button.name}
                </a>
              </li>
            ))}
          </ul>

          {(todos.length !== leftTodo) && (
            <button
              type="button"
              className="clear-completed"
              onClick={clearCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </>
  );
};
