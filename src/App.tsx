/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodoMethod, TodosContext } from './component/TodosContext';
import cn from 'classnames';
import { SortType } from './component/types/types';
import { Todo } from './component/todo';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');

  const methods = useContext(TodoMethod);
  const { todos, sorted, setSorted } = useContext(TodosContext);

  const field = useRef<HTMLInputElement>(null);

  const activeTodos = todos.filter(todo => !todo.completed);
  const visibleTodos = [...todos].filter(todo => {
    switch (sorted) {
      case SortType.Active:
        return !todo.completed;
      case SortType.Completed:
        return todo.completed;
      default:
        return -1;
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (trimmedTitle) {
      methods.addTodo(trimmedTitle);
      setTitle('');
      field.current?.focus();
    }
  };

  useEffect(() => {
    field.current?.focus();
  }, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', {
                active: activeTodos.length === 0,
              })}
              data-cy="ToggleAllButton"
              onClick={methods.toggleAll}
            />
          )}

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={field}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {visibleTodos.map(todo => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeTodos.length} items left`}
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: SortType.All === sorted,
                })}
                data-cy="FilterLinkAll"
                onClick={() => setSorted(SortType.All)}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: SortType.Active === sorted,
                })}
                data-cy="FilterLinkActive"
                onClick={() => setSorted(SortType.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: SortType.Completed === sorted,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setSorted(SortType.Completed)}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={methods.clearCompleted}
              disabled={activeTodos.length === todos.length}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
