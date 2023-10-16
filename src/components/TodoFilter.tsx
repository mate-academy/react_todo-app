import { useContext, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { DispatchTodo, StateTodo } from '../context';
import { ActionTypes } from '../types';
import { FILTER_BUTTONS } from '../utils';

type Props = {
  location: {
    search: string;
  }
};

export const TodoFilter: React.FC<Props> = ({ location }) => {
  const { todos } = useContext(StateTodo);
  const dispatch = useContext(DispatchTodo);

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
        {FILTER_BUTTONS.map(({ id, caption }) => (
          <li key={id}>
            <NavLink
              to={{ pathname: id, search: location.search }}
              className={({ isActive }) => classNames({ selected: isActive })}
            >
              {caption}
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
