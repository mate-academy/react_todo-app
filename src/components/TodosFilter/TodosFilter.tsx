import React, { useContext } from 'react';
import cn from 'classnames';
import { TodosContext } from '../TodosContext/TodosContext';
import { Status } from '../../types/enums';
import { Todo } from '../../types/todo';

type Props = {
  selected: Status,
  setSelected: (status: Status) => void,
  setFilteredTodos: (todos: Todo[]) => void,
};

export const TodosFilter: React.FC<Props> = ({
  selected,
  setSelected,
  setFilteredTodos,
}) => {
  const { todos } = useContext(TodosContext);

  const handleFilter = (status: Status) => {
    switch (status) {
      case (Status.Active):
        setSelected(Status.Active);
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      case (Status.Completed):
        setSelected(Status.Completed);
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      default:
        setSelected(Status.All);
        setFilteredTodos(todos);
    }
  };

  return (
    <ul
      className="filters"
      data-cy="todosFilter"
    >
      <li>
        <a
          href="#/"
          className={cn({
            selected: selected === Status.All,
          })}
          onClick={() => handleFilter(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({
            selected: selected === Status.Active,
          })}
          onClick={() => handleFilter(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({
            selected: selected === Status.Completed,
          })}
          onClick={() => handleFilter(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
