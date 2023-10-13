import { useContext, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { DispatchTodo, StateTodo } from '../context';
import { Status, ActionTypes } from '../types';

type Props = {
  location: {
    search: string;
  }
};

export const TodoFilter: React.FC<Props> = ({ location }) => {
  const { todos } = useContext(StateTodo);
  const dispatch = useContext(DispatchTodo);

  const status = [Status.ALL, Status.ACTIVE, Status.COMPLETED];
  const naming = ['All', 'Active', 'Completed'];

  const itemsLeft = useMemo(
    () => todos.filter((todo) => !todo.completed).length, [todos],
  );

  const isTodosCompleted = useMemo(
    () => todos.filter(todo => todo.completed).length, [todos],
  );

  const deleteCompletedTodo = () => {
    dispatch({ type: ActionTypes.DELETE_COMPLETED });
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${itemsLeft} item${itemsLeft > 1 ? 's' : ''}`}
      </span>

      <ul className="filters">
        {status.map((item, index) => (
          <li key={item}>
            <NavLink
              to={{ pathname: item, search: location.search }}
              className={({ isActive }) => classNames({ selected: isActive })}
            >
              {naming[index]}
            </NavLink>
          </li>
        ))}

      </ul>

      {isTodosCompleted > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={deleteCompletedTodo}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

/* <ul className="filters">
        <li>
          <a
            href="#/"
            className="selected"
            onClick={() => changeStatus(Status.ALL)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            onClick={() => changeStatus(Status.ACTIVE)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            onClick={() => changeStatus(Status.COMPLETED)}
          >
            Completed
          </a>
        </li>
      </ul> */
