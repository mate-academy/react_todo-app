import classNames from 'classnames';
import React, { useContext } from 'react';
import { Filter, FilteredTodosContext } from '../context/FilteredTodosContext';
import { TodosContext } from '../context/TodosContext';
import { Todo } from '../types/Todo';

type Props = {
  activeTodos: Todo[] | [];
};

export const Footer: React.FC<Props> = ({ activeTodos }) => {
  const filteredContext = useContext(FilteredTodosContext);
  const context = useContext(TodosContext);

  if (!context || !filteredContext) {
    throw new Error('TodoList must be used within a TodosProvider');
  }

  const { todos, setTodos } = context;
  const { filter, setFilter } = filteredContext;
  const activeTodosLength = [...todos].filter(item => !item.completed).length;

  function removeCompleted() {
    const result = todos.filter(todo => !todo.completed);

    setTodos(result);
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosLength} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === Filter.ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(Filter.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === Filter.ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(Filter.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === Filter.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(Filter.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={activeTodos.length === todos.length}
        onClick={() => removeCompleted()}
      >
        Clear completed
      </button>
    </footer>
  );
};
