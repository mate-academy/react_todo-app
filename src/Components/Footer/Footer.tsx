import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/TodoStatus';

type Props = {
  todos: Todo[],
  setTodos: (todo: Todo[]) => void,
  selectedStatus: Status,
  setSelectedStatus: (selectedType: Status) => void,
};

export const Footer: React.FC<Props> = ({
  todos, selectedStatus, setSelectedStatus, setTodos,
}) => {
  const todosCompleted = todos.filter(todo => todo.completed).length;

  const todosActive = useMemo(() => {
    return todos.filter(todo => !todo.completed);
  }, [todos]);

  const deleteCompleted = () => {
    setTodos(todosActive);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todosActive.length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames(
              'filter__link',
              { selected: selectedStatus === 'All' },
            )}
            onClick={() => setSelectedStatus(Status.All)}
          >
            {Status.All}
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames(
              'filter__link',
              { selected: selectedStatus === 'Active' },
            )}
            onClick={() => setSelectedStatus(Status.ACTIVE)}
          >
            {Status.ACTIVE}
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames(
              'filter__link',
              { selected: selectedStatus === 'Completed' },
            )}
            onClick={() => setSelectedStatus(Status.COMPLETED)}
          >
            {Status.COMPLETED}
          </a>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={deleteCompleted}
      >
        {todosCompleted > 0 && ('Clear completed')}
      </button>
    </footer>
  );
};
