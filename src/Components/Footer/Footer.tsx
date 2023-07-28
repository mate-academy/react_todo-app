import { Todo } from '../../Types/Todo';
import { useLocalStorage } from '../../hooks/UseLocalStorege';

export const Footer = () => {
  const [todos] = useLocalStorage<Todo[]>('todos', []);

  const isTodos = todos.length > 0;

  console.log(!isTodos);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        3 items left
      </span>

      <ul className="filters">
        <li>
          <a href="#/" className="selected">All</a>
        </li>

        <li>
          <a href="#/active">Active</a>
        </li>

        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>

      <button type="button" className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
