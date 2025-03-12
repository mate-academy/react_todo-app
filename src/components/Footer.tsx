import React, { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';
import { Filter } from '../utils/Enums';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const { todos, setTodos, todosFilter, setTodosFilter } =
    useContext(TodosContext);

  const notCompletedTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const handleClearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompletedTodos.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(filter => (
          <a
            key={filter}
            href={filter === Filter.All ? '#/' : `#/${filter}`}
            className={classNames('filter__link', {
              selected: todosFilter === filter,
            })}
            data-cy={`FilterLink${filter}`}
            onClick={() => setTodosFilter(filter)}
          >
            {filter}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!completedTodos.length}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
