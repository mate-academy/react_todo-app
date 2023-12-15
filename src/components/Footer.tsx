import React, { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import { TodosFilter } from './TodoFilter';
import { Status } from '../types/Status';

export const Footer: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [filter, setFilter] = useState<Status>(Status.All);

  const handleFilterChange = (status: Status) => {
    setFilter(status);
  };

  React.useEffect(() => {
    const filteredTodos = todos.filter((todo) => {
      switch (filter) {
        case Status.Active:
          return !todo.completed;
        case Status.Completed:
          return todo.completed;
        default:
          return true;
      }
    });

    setTodos(filteredTodos);
  }, [filter, setTodos, todos]);

  const itemsLeft = todos.filter(todo => !todo.completed).length;

  const handleClearCompleted = () => {
    const uncompletedTodos = todos.filter(todo => !todo.completed);

    setTodos(uncompletedTodos);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${itemsLeft} item${itemsLeft !== 1 ? 's' : ''} left`}
      </span>

      <TodosFilter filter={filter} onFilterChange={handleFilterChange} />

      <button
        type="button"
        className="clear-completed"
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
