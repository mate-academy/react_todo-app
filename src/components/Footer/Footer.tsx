import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { DispatchTodos, StateTodos } from '../TodosContext/TodosContext';
import { Query } from '../../helpers/Query';
import { QueryEnum } from '../../helpers/QueryEnum';

interface Props {
  setQuery: (value: Query) => void;
}

export const Footer: React.FC<Props> = ({ setQuery = () => { } }) => {
  const [selected, setSelected] = useState<Query>(QueryEnum.All);
  const todos = useContext(StateTodos);
  const dispatch = useContext(DispatchTodos);
  let itemsLeft = '';

  const notCompletedTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

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
    setSelected(value as Query);
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
                  selected: selected === QueryEnum.All,
                })}
                onClick={() => handleClick(QueryEnum.All)}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={classNames({
                  selected: selected === QueryEnum.Active,
                })}
                onClick={() => handleClick(QueryEnum.Active)}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={classNames({
                  selected: selected === QueryEnum.Completed,
                })}
                onClick={() => handleClick(QueryEnum.Completed)}
              >
                Completed
              </a>
            </li>
          </ul>

          {!!completedTodos.length && (
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
