import React from 'react';
import { FilterLink } from '../FilterLink/FilterLink';
import { Props } from './Props';

export const TodoFilter: React.FC<Props> = React.memo(
  ({
    onClear,
    todos,
  }) => {
    const isAnyTodoCompleted = todos.some(todo => todo.completed);
    const quantityCompletedTodos = [...todos]
      .filter(todo => todo.completed).length;

    return (
      <>
        <span className="todo-count" data-cy="todosCounter">
          {`${todos.length - quantityCompletedTodos} items left`}
        </span>

        <nav className="filter">
          <FilterLink params={{ filter: null }} text="All" />

          <FilterLink params={{ filter: 'Active' }} text="Active" />

          <FilterLink params={{ filter: 'Completed' }} text="Completed" />
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          onClick={onClear}
          disabled={!isAnyTodoCompleted}
          style={{ opacity: isAnyTodoCompleted ? 1 : 0 }}
        >
          Clear completed
        </button>
      </>
    );
  },
);
