import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { SortEnum } from '../types/sort';

type Props = {
  select: string,
  setSelect:(value: SortEnum) => void;
  todos: Todo[];
  lengTodos: number,
  handleDeleteTodoCompleted: () => void;
};

export const TodoFooter: React.FC<Props> = ({
  setSelect,
  lengTodos,
  select,
  handleDeleteTodoCompleted,
  todos,
}) => {
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
            { selected: select === SortEnum.ALL },
          )}
          onClick={() => setSelect(SortEnum.ALL)}
        >
          All
        </a>
        <a
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: select === SortEnum.ACTIVE },
          )}
          onClick={() => setSelect(SortEnum.ACTIVE)}
        >
          Active
        </a>
        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: select === SortEnum.COMPLETED },
          )}
          onClick={() => setSelect(SortEnum.COMPLETED)}
        >
          Completed
        </a>
      </nav>
      <button
        type="button"
        className={classNames(
          'todoapp__clear-completed',
          { todoapp_opacity: buttonClear < 1 },
        )}
        onClick={handleDeleteTodoCompleted}

      >
        Clear completed
      </button>
    </footer>
  );
};
