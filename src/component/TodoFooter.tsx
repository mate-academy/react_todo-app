import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  select: string,
  setSelect:(value: string) => void;
  todos: Todo[];
  lengTodos: number,
  handleDeleteTodoCompleted: () => void;
};

export const TodoFooter: React.FC<Props> = (
  {
    setSelect,
    lengTodos,
    select,
    handleDeleteTodoCompleted,
    todos,
  },
) => {
  const buttonClear = todos.filter(todo => todo.completed).length;

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${lengTodos}  item${lengTodos > 1 ? 's' : ''} left`}
      </span>
      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: select === 'all' },
          )}
          onClick={() => setSelect('all')}
        >
          All
        </a>
        <a
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: select === 'active' },
          )}
          onClick={() => setSelect('active')}
        >
          Active
        </a>
        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: select === 'completed' },
          )}
          onClick={() => setSelect('completed')}
        >
          Completed
        </a>
      </nav>
      <button
        type="button"
        className={classNames(
          'todoapp__clear-completed',
          { opacity: buttonClear === 0 },
        )}
        onClick={handleDeleteTodoCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
