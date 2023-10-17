import React from 'react';
import cl from 'classnames';
import { Todo } from '../../types/Todo';
import { FilterStatus } from '../../types/FilterStatus';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filterStatus: FilterStatus;
  setFilterStatus: React.Dispatch<React.SetStateAction<FilterStatus>>;
}

export const TodosFilter: React.FC<Props> = ({
  todos,
  setTodos,
  filterStatus,
  setFilterStatus,
}) => {
  const isCompleted = todos.find(item => item.completed);
  const handleFilterClick = (filter: FilterStatus) => {
    setFilterStatus(filter);
  };

  const todoNotCompleted = (): number => {
    return todos.filter(item => !item.completed).length;
  };

  const handleDeleteTodoCompleted = () => {
    const updatedTodos = todos.filter(item => item.completed !== true);

    setTodos(updatedTodos);
  };

  if (todos.length > 0) {
    return (
      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${todoNotCompleted()}
          items left`}
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              className={cl({ selected: filterStatus === 'All' })}
              onClick={() => handleFilterClick(FilterStatus.All)}
            >
              All
            </a>
          </li>

          <li>
            <a
              href="#/active"
              className={cl({ selected: filterStatus === 'Active' })}
              onClick={() => handleFilterClick(FilterStatus.Active)}
            >
              Active
            </a>
          </li>

          <li>
            <a
              href="#/completed"
              className={cl({ selected: filterStatus === 'Completed' })}
              onClick={() => handleFilterClick(FilterStatus.Completed)}
            >
              Completed
            </a>
          </li>
        </ul>
        {isCompleted && (
          <button
            type="button"
            className="clear-completed"
            onClick={handleDeleteTodoCompleted}
          >
            Clear completed
          </button>
        )}
      </footer>
    );
  }

  return null;
};
