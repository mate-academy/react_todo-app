import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import cn from 'classnames';

import { Todo } from '../types/Todo';
import { TodosContext } from '../store/TodosContextProvider';
import { Status } from '../types/Status';

interface Props {
  handleFilteredTodos: (newTodos: Todo[]) => void;
}

export const TodosFilter: React.FC<Props> = React.memo(({
  handleFilteredTodos,
}) => {
  const [filterBy, setFilterBy] = useState(Status.ALL);
  const todos = useContext(TodosContext);

  useEffect(
    () => {
      switch (filterBy) {
        case Status.ALL:
          handleFilteredTodos(todos);
          break;

        case Status.ACTIVE:
          handleFilteredTodos(todos.filter(todo => !todo.completed));
          break;

        case Status.COMPLETED:
          handleFilteredTodos(todos.filter(todo => todo.completed));
          break;

        default:
          handleFilteredTodos(todos);
      }
    },
    [todos, filterBy, handleFilteredTodos],
  );

  const handleAll = useCallback(() => {
    if (filterBy !== Status.ALL) {
      setFilterBy(Status.ALL);
    }
  }, [filterBy]);

  const handleActive = useCallback(() => {
    if (filterBy !== Status.ACTIVE) {
      setFilterBy(Status.ACTIVE);
    }
  }, [filterBy]);

  const handleCompleted = useCallback(() => {
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
          onClick={handleAll}
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
          onClick={handleActive}
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
          onClick={handleCompleted}
        >
          Completed
        </a>
      </li>
    </ul>
  );
});
