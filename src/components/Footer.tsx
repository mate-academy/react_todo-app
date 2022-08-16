/* eslint-disable no-console */
import { NavLink } from 'react-router-dom';
import { Todo } from '../types/todo';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export const Footer: React.FC<Props> = ({ todos, setTodos }) => {
  const createClassName = ({ isActive }: { isActive: boolean }) => {
    if (isActive) {
      return 'selected';
    }

    return '';
  };

  const clearAll = () => {
    const updatedTodos = todos.filter(todo => todo.completed === false);

    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {todos.length}
        {' '}
        todos left
      </span>
      <ul className="filters">
        <li>
          <NavLink to="/" className={createClassName}>All</NavLink>
        </li>

        <li>
          <NavLink to="active" className={createClassName}>Active</NavLink>
        </li>

        <li>
          <NavLink
            to="completed"
            className={createClassName}
          >
            Completed
          </NavLink>
        </li>
      </ul>
      {todos.some(todo => todo.completed === true)
        ? (
          <button
            type="button"
            className="clear-completed"
            onClick={(() => clearAll())}
          >
            Clear completed
          </button>
        )
        : null}
    </footer>
  );
};
