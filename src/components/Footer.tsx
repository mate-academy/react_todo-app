import cn from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import { Todo } from '../types/Todo';
import { ShowState } from '../types/ShowState';

type Props = {
  todos: Todo[],
  showState: ShowState,
  setShowState: Dispatch<SetStateAction<ShowState>>;
  setTodos: Dispatch<SetStateAction<Todo[]>>,
};

export const Footer: React.FC<Props> = ({
  todos,
  showState,
  setShowState,
  setTodos,
}) => {
  const handleClear = () => {
    const newTodos = todos.filter(todo => !todo.completed);

    setTodos(newTodos);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={cn({
              selected: showState === ShowState.All,
            })}
            onClick={() => setShowState(ShowState.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn({
              selected: showState === ShowState.Active,
            })}
            onClick={() => setShowState(ShowState.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn({
              selected: showState === ShowState.Completed,
            })}
            onClick={() => setShowState(ShowState.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={handleClear}
        style={{
          visibility: todos.some(todo => todo.completed) ? 'visible' : 'hidden',
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
