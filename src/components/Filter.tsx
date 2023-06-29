import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

type Props = {
  visibleTodos: Todo[];
  setTodos: (value: Todo[]) => void;
  location: {
    search: string;
  }
};

export const FilterTodos: FC<Props> = ({
  visibleTodos,
  setTodos,
  location,
}) => {
  const itemsLeft = visibleTodos.filter(todo => !todo.completed).length;
  const completedTodos = visibleTodos.filter(todo => todo.completed);
  const status = [Status.ALL, Status.ACTIVE, Status.COMPLETED];
  const naming = ['All', 'Active', 'Completed'];

  const onClearCopmpletedTodos = () => {
    setTodos(visibleTodos.filter(todo => !todo.completed));
  };

  return (
    <>
      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${itemsLeft} item${itemsLeft === 1 ? '' : 's'} left`}
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

        <button
          type="button"
          className="clear-completed"
          onClick={onClearCopmpletedTodos}
          disabled={!completedTodos.length}
        >
          {completedTodos.length > 0 ? 'Clear completed' : ''}
        </button>
      </footer>
    </>
  );
};
