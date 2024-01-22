import React, { useContext } from 'react';
import { Todo } from '../../types/todo';
import { TodosContext } from '../TodosContext/TodosContext';
import { Status } from '../../types/enums';

type Props = {
  setFilteredTodos: (todos: Todo[]) => void,
};

export const TodosFilter: React.FC<Props> = ({
  setFilteredTodos,
}) => {
  const { todos } = useContext(TodosContext);

  const handleFilter = (status: Status) => {
    switch (status) {
      case (Status.Active):
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      case (Status.Completed):
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      default: setFilteredTodos(todos);
    }
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className="selected"
          onClick={() => handleFilter(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          onClick={() => handleFilter(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={() => handleFilter(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
