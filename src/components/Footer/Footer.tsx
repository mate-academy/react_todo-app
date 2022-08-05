import { NavLink } from 'react-router-dom';
import { response } from '../../api/api';
import { Todo } from '../../types/Todo';

type Props = {
  setHasClear: React.Dispatch<React.SetStateAction<boolean>>,
};

export const Footer: React.FC<Props> = ({ setHasClear }) => {
  const handlerClick = () => {
    response('/todos?completed=false', { method: 'GET' })
      .then((todos) => todos.map((todo: Todo) => todo.id))
      .then(todo => {
        setHasClear(true);

        return todo
          .map((todoId: number) => response(
            `/todos/${todoId}`,
            { method: 'DELETE' },
          ));
      });
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${0} `}
        items left
      </span>

      <ul className="filters">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'selected' : '')}
          >
            All
          </NavLink>
        </li>

        <li>
          <NavLink
            to="active"
            className={({ isActive }) => (isActive ? 'selected' : '')}
          >
            Active
          </NavLink>
        </li>

        <li>
          <NavLink
            to="completed"
            className={({ isActive }) => (isActive ? 'selected' : '')}
          >
            Completed
          </NavLink>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={handlerClick}
      >
        Clear completed
      </button>
    </footer>
  );
};
