import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../TodoContext/TodoContext';
import { Todo } from '../../types/Todo';
import { ButtonFilter } from '../enum/ButtonFilter';

type Props = {
  setChooseTodos: (select: string) => void,
  filterTodosCount: Todo[],
  filterListTodos: string,
};

export const TodosFilter: React.FC<Props> = ({
  setChooseTodos,
  filterTodosCount,
  filterListTodos,
}) => {
  const { todos, setTodos } = useContext(TodoContext);

  const clearPerformedTask = () => {
    const newTodos = [...todos]
      .filter(todo => !todo.completed);

    setTodos(newTodos);
  };

  const findClearTasK = useMemo(() => todos
    .find(todo => todo.completed), [todos]);

  return (
    <footer className="footer">

      <span className="todo-count" data-cy="todosCounter">
        {`${filterTodosCount.length} items left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        <li>
          <a
            href="#/"
            className={classNames({
              selected: filterListTodos === ButtonFilter.all,
            })}
            onClick={() => setChooseTodos(ButtonFilter.all)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({
              selected: filterListTodos === ButtonFilter.active,
            })}
            onClick={() => setChooseTodos(ButtonFilter.active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            className={classNames({
              selected: filterListTodos === ButtonFilter.completed,
            })}
            href="#/completed"
            onClick={() => setChooseTodos(ButtonFilter.completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {findClearTasK && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearPerformedTask}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
