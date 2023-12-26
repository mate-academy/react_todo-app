import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import {
  TodosContext,
} from '../GlobalContextProvider';
import { Todo } from '../../types/Todo';

export enum Status {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

interface Props {
  handleFilterTodos: (newTodos: Todo[]) => void;
}

export const TodosFilter: React.FC<Props> = React.memo(({
  handleFilterTodos,
}) => {
  const [filterBy, setFilterBy] = useState(Status.all);
  const todos = useContext(TodosContext);

  useEffect(
    () => {
      switch (filterBy) {
        case Status.all:
          handleFilterTodos(todos);
          break;

        case Status.active:
          handleFilterTodos(todos.filter(todo => !todo.completed));
          break;

        case Status.completed:
          handleFilterTodos(todos.filter(todo => todo.completed));
          break;

        default:
          handleFilterTodos(todos);
      }
    },
    [todos, filterBy, handleFilterTodos],
  );

  const handleAllClick = useCallback(() => {
    if (filterBy !== Status.all) {
      setFilterBy(Status.all);
    }
  }, [filterBy]);

  const handleActiveClick = useCallback(() => {
    if (filterBy !== Status.active) {
      setFilterBy(Status.active);
    }
  }, [filterBy]);

  const handleCompletedClick = useCallback(() => {
    if (filterBy !== Status.completed) {
      setFilterBy(Status.completed);
    }
  }, [filterBy]);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: filterBy === Status.all,
          })}
          onClick={handleAllClick}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: filterBy === Status.active,
          })}
          onClick={handleActiveClick}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: filterBy === Status.completed,
          })}
          onClick={handleCompletedClick}
        >
          Completed
        </a>
      </li>
    </ul>
  );
});
