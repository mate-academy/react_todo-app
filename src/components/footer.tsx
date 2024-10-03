import { useContext } from 'react';
import { Filter } from '../Types/Filter';
import { MyContext } from './state';
import { Todo } from '../Types/Todo';
import React from 'react';
import classNames from 'classnames'; // Ensure this is imported as classNames

export const Footer: React.FC = () => {
  const { todos, filter, deleteTodo, setFilter } = useContext(MyContext);

  const handleFilterChange = (newFilter: Filter) => setFilter(newFilter);

  function handleDeleteAllCompleted() {
    const allCompletedTodos = todos.filter((todo: Todo) => todo.completed);

    allCompletedTodos.forEach((todo: Todo) => deleteTodo(todo.id));
  }

  const activeTodoCount = todos.filter((todo: Todo) => !todo.completed).length;

  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {activeTodoCount} items left
          </span>

          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={classNames('filter__link', {
                selected: filter === Filter.ALL,
              })}
              data-cy="FilterLinkAll"
              onClick={() => handleFilterChange(Filter.ALL)}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames('filter__link', {
                selected: filter === Filter.ACTIVE,
              })}
              data-cy="FilterLinkActive"
              onClick={() => handleFilterChange(Filter.ACTIVE)}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames('filter__link', {
                selected: filter === Filter.COMPLETED,
              })}
              data-cy="FilterLinkCompleted"
              onClick={() => handleFilterChange(Filter.COMPLETED)}
            >
              Completed
            </a>
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={handleDeleteAllCompleted}
            disabled={todos.every((todo: Todo) => !todo.completed)}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
