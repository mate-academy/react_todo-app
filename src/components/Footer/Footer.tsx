import { NavLink } from 'react-router-dom';
import { response } from '../../api/api';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
};

export const Footer: React.FC<Props> = ({ setTodos, todos }) => {
  const completedtodos = todos.filter(todo => !todo.completed).length;

  const handlerClick = () => {
    setTodos(
      todos.filter(todo => todo.completed),
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
    <footer className="footer">
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
    </footer>
  );
};
