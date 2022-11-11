import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { PageNavLink } from '../PageNavLink';

type Props = {
  todos: Todo[]
  deleteCompleted: () => void;
  isAdding: boolean;
};

export const Footer: React.FC<Props> = (
  {
    todos,
    deleteCompleted,
    isAdding,
  },
) => {
  return (
    <>
      {(todos.length > 0 || isAdding) && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${todos.filter(todo => !todo.completed).length} items left`}
          </span>

          <nav className="filter" data-cy="Filter">
            <PageNavLink to="/" text="All" />
            <PageNavLink to="active" text="Active" />
            <PageNavLink to="completed" text="Completed" />
          </nav>

          <button
            data-cy="ClearCompletedButton"
            type="button"
            className={classNames(
              'todoapp__clear-completed',
              {
                'is-invisible': todos.every(todo => !todo.completed),
              },
            )}
            onClick={() => deleteCompleted()}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
