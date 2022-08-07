import { NavLink } from 'react-router-dom';
import { response } from '../../api/api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
};

export const Footer: React.FC<Props> = ({
  setTodos,
  setUser,
  todos,
  user,
}) => {
  const completedtodos = todos.filter(todo => !todo.completed).length;

  const handlerClick = () => {
    setTodos(
      todos.filter(todo => !todo.completed),
    );

    response('/todos?completed=false', { method: 'GET' })
      .then((todosFromServer) => todosFromServer.map((todo: Todo) => todo.id))
      .then(todo => {
        return todo
          .map((todoId: number) => response(
            `/todos/${todoId}`,
            { method: 'DELETE' },
          ));
      });
  };

  return (
    <footer>
      <div className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${todos.filter(todo => !todo.completed).length} `}
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

        {completedtodos > 0 && (
          <button
            type="button"
            className="clear-completed"
            onClick={handlerClick}
          >
            Clear completed
          </button>
        )}
      </div>

      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <span className="icon is-large">
                <i className="fas fa-2x fa-user" />
              </span>
            </div>
            <div className="media-content">
              <p className="title is-4">{user.name}</p>
              <p className="subtitle is-6">{user.email}</p>
            </div>
          </div>
          <button
            type="button"
            className="button is-danger is-rounded is-centered"
            onClick={() => setUser(null)}
          >
            Exit
          </button>
        </div>
      </div>
    </footer>
  );
};
