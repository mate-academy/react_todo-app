import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { DispatchTodos, StateTodos } from '../TodosContext/TodosContext';
import { Query } from '../../helpers/Query';

interface Props {
  setQuery: (value: Query) => void;
}

export const Footer: React.FC<Props> = ({ setQuery = () => { } }) => {
  const [selected, setSelected] = useState('All');
  const todos = useContext(StateTodos);
  const dispatch = useContext(DispatchTodos);
  let itemsLeft = '';

  const notCompletedTodos = todos.filter(todo => todo.completed === false);
  const completedTodos = todos.filter(todo => todo.completed === true);

  if (todos.length) {
    switch (notCompletedTodos.length) {
      case 1:
        itemsLeft = '1 item left';
        break;

      default:
        itemsLeft = `${notCompletedTodos.length} items left`;
    }
  } else {
    itemsLeft = '';
  }

  const handleClick = (value: string) => {
    setQuery(value as Query);
    setSelected(value);
  };

  return (
    <>
      {itemsLeft && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {itemsLeft}
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={classNames({
                  selected: selected === 'All',
                })}
                onClick={() => handleClick('All')}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={classNames({
                  selected: selected === 'Active',
                })}
                onClick={() => handleClick('Active')}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={classNames({
                  selected: selected === 'Completed',
                })}
                onClick={() => handleClick('Completed')}
              >
                Completed
              </a>
            </li>
          </ul>

          {completedTodos.length !== 0 && (
            <button
              type="button"
              className="clear-completed"
              onClick={() => dispatch({ type: 'clearCompletedTodos' })}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </>
  );
};
