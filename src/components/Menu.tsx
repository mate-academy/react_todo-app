import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { deleteTodo, getTodos } from '../api/todos';
import { Todo } from '../types/Todo';

type Props = {
  itemsLeft: number;
  todos: Todo[];
  setTodos: (value: Todo[]) => void;
};

const getActiveClasses = (status: { isActive: boolean }) => classNames(
  { selected: status.isActive },
);

export const Menu:React.FC<Props> = ({ itemsLeft, todos, setTodos }) => {
  const handleClearCompleted = async () => {
    await Promise.all(todos.filter(todo => todo.completed)
      .map(newTodo => deleteTodo(newTodo.id)));

    getTodos().then(setTodos);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${itemsLeft} items left`}
      </span>

      <ul className="filters">
        <li>
          <NavLink
            to="/"
            className={getActiveClasses}
          >
            All
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/active"
            className={getActiveClasses}
          >
            Active
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/completed"
            className={getActiveClasses}
          >
            Completed
          </NavLink>
        </li>
      </ul>

      {itemsLeft < todos.length && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
