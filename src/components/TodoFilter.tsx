import classNames from 'classnames';

import { useContext } from 'react';
import { Status } from '../services/Types';
import { DispatchContext, StateContext } from '../services/TodosContext';

const filterButtons = [
  { address: '#/', name: Status.All },
  { address: '#/active', name: Status.Active },
  { address: '#/completed', name: Status.Completed },
];

export const TodoFilter: React.FC = () => {
  const { todos, visible } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleFilterOnClick = (status: Status) => {
    dispatch({
      type: status,
      payload: { status },
    });
  };

  const handleClearOnClick = () => {
    dispatch({ type: 'clearCompleted' });
  };

  const isTodoComplited = todos.some(todo => todo.completed);
  const amountUncompletedTodos = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${amountUncompletedTodos} items left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        {filterButtons.map(({ address, name }) => (
          <li key={name}>
            <a
              href={address}
              className={classNames({ selected: name === visible })}
              onClick={() => handleFilterOnClick(name)}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>

      {isTodoComplited && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearOnClick}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
