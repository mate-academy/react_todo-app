import React from 'react';
import cl from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  isFilter: string | undefined;
  setIsFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const TodosFilter: React.FC<Props> = ({
  todos,
  setTodos,
  isFilter,
  setIsFilter,
}) => {
  const handleFilterClick = (filter: string) => {
    setIsFilter(filter);
  };

  const todoNotCompleted = (): number => {
    return todos.filter(item => item.completed === false).length;
  };

  const handleDeleteTodoCompleted = () => {
    const updatedTodos = todos.filter(item => item.completed !== true);

    setTodos(updatedTodos);
  };

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
            className={cl({ selected: isFilter === 'All' })}
            onClick={() => handleFilterClick('All')}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cl({ selected: isFilter === 'Active' })}
            onClick={() => handleFilterClick('Active')}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cl({ selected: isFilter === 'Completed' })}
            onClick={() => handleFilterClick('Completed')}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={handleDeleteTodoCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
