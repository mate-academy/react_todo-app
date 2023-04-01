import { Todo } from '../../types/Todo';
import { PageNavLink } from '../PageNavLink';

type Props = {
  todos: Todo[];
  clearCompleted: () => void;
};

export const Footer:React.FC<Props> = ({
  todos,
  clearCompleted,
}) => {
  const todosLeft = todos.filter(todoLeft => !todoLeft.completed).length;
  const isVisibleButton = todos.filter(todo => todo.completed).length;

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {todosLeft === 1 ? '1 item left' : `${todosLeft} items left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        <li>
          <PageNavLink
            to="/"
            text="All"
          />
        </li>

        <li>
          <PageNavLink
            to="/active"
            text="Active"
          />
        </li>

        <li>
          <PageNavLink
            to="/completed"
            text="Completed"
          />
        </li>
      </ul>

      {isVisibleButton > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
