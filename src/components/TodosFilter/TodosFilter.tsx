import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { TodosContext } from '../../store/GlobalContextProvider';
import { Status } from '../../types/Status';

interface Props {
  handleFilterTodos: (newTodos: Todo[]) => void;
}

export const TodosFilter: React.FC<Props> = React.memo(({
  handleFilterTodos,
}) => {
  const [filterBy, setFilterBy] = useState(Status.ALL);
  const todos = useContext(TodosContext);

  useEffect(
    () => {
      switch (filterBy) {
        case Status.ALL:
          handleFilterTodos(todos);
          break;

        case Status.ACTIVE:
          handleFilterTodos(todos.filter(todo => !todo.completed));
          break;

        case Status.COMPLETED:
          handleFilterTodos(todos.filter(todo => todo.completed));
          break;

        default:
          handleFilterTodos(todos);
      }
    },
    [todos, filterBy, handleFilterTodos],
  );

  const handleAllClick = useCallback(() => {
    if (filterBy !== Status.ALL) {
      setFilterBy(Status.ALL);
    }
  }, [filterBy]);

  const handleActiveClick = useCallback(() => {
    if (filterBy !== Status.ACTIVE) {
      setFilterBy(Status.ACTIVE);
    }
  }, [filterBy]);

  const handleCompletedClick = useCallback(() => {
    if (filterBy !== Status.COMPLETED) {
      setFilterBy(Status.COMPLETED);
    }
  }, [filterBy]);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={cn({
            selected: filterBy === Status.ALL,
          })}
          onClick={handleAllClick}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({
            selected: filterBy === Status.ACTIVE,
          })}
          onClick={handleActiveClick}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({
            selected: filterBy === Status.COMPLETED,
          })}
          onClick={handleCompletedClick}
        >
          Completed
        </a>
      </li>
    </ul>
  );
});
