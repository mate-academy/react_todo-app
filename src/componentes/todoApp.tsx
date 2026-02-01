import React, { useContext } from 'react';
import { TodoContext } from '../context/todocontext';

export const TodoApp: React.FC = () => {
  const context = useContext(TodoContext);
  const {
    todo,
    handleActive,
    handleCompleted,
    handleFilterAll,
    filter,
    handleRemoveCompleted,
  } = context; // valor original

  const contagem = todo.filter(
    t => t.completed === false && t.title.length !== 0,
  );
  const tamanho = contagem.length;

  return (
    <>
      <span className="todo-count" data-cy="TodosCounter">
        {`${tamanho} item left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => handleFilterAll('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => handleActive('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => handleCompleted('completed')}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => handleRemoveCompleted(todo)}
      >
        Clear completed
      </button>
    </>
  );
};
