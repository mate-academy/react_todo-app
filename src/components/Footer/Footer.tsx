import React, { useContext } from 'react';
import { TodoContext } from '../../TodoContext';
import { Filter } from '../../types/types';

type Props = {};

export const Footer: React.FC<Props> = () => {
  const {
    state,
    filterTodo,
    removeTodo,
    getFilteredTodo,
  } = useContext(TodoContext);
  const activeTodos = state.filter(todo => todo.completed === false);
  const isCompleted = state.some(todo => todo.completed === true);

  return (
    <footer className={state.length === 0 ? 'footer hidden' : 'footer'}>
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={filterTodo === Filter.All ? 'selected' : ''}
            onClick={() => getFilteredTodo(Filter.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={filterTodo === Filter.Active ? 'selected' : ''}
            onClick={() => getFilteredTodo(Filter.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={filterTodo === Filter.Completed ? 'selected' : ''}
            onClick={() => getFilteredTodo(Filter.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        type="button"
        className={isCompleted ? 'clear-completed' : 'clear-completed hidden'}
        onClick={() => removeTodo('All')}
      >
        Clear completed
      </button>
    </footer>
  );
};
