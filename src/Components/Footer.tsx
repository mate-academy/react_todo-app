import React, { useContext, useMemo } from 'react';
import { TodosContext } from './TodosContext';
import { Filter } from '../Types/Filter';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const { todos, setTodos, filter, setFilter } = useContext(TodosContext);

  const countActiveTodo = useMemo(() => {
    return todos.reduce((count, todo) => count + Number(!todo.completed), 0);
  }, [todos]);

  const handleClearCompleted = () => {
    const clearedTodos = [...todos].filter(todo => !todo.completed);

    setTodos(clearedTodos);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {countActiveTodo} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.keys(Filter).map(key => (
          <a
            key={key}
            href={`#/${Filter[key as keyof typeof Filter]}`}
            className={classNames('filter__link', {
              selected: filter === Filter[key as keyof typeof Filter],
            })}
            data-cy={`FilterLink${key}`}
            onClick={() => setFilter(Filter[key as keyof typeof Filter])}
          >
            {key}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
        disabled={todos.length === countActiveTodo}
      >
        Clear completed
      </button>
    </footer>
  );
};
