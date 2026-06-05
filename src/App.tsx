import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useTodos } from './contexts/TodoContext';
import { TodoItem } from './components/TodoItem';

export const App: React.FC = () => {
  const { state, dispatch } = useTodos();

  const { todos, filter } = state;

  const filteredTodos = todos.filter(todo => {
    if (filter === 'Active') {
      return !todo.completed;
    }

    if (filter === 'Completed') {
      return todo.completed;
    }

    return true;
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const prevTodosLength = useRef(state.todos.length);

  const activeCount = todos.filter(t => !t.completed).length;
  const hasCompleted = todos.some(t => t.completed);
  const allCompleted = todos.length > 0 && todos.every(t => t.completed);

  useEffect(() => {
    const prev = prevTodosLength.current;
    const current = state.todos.length;

    if (current < prev) {
      inputRef.current?.focus();
    }

    prevTodosLength.current = current;
  }, [state.todos.length]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              data-cy="ToggleAllButton"
              className={classNames('todoapp__toggle-all', {
                active: allCompleted,
              })}
              onClick={() => dispatch({ type: 'toggleAll' })}
            />
          )}

          <form
            onSubmit={e => {
              e.preventDefault();

              const input = e.currentTarget.elements.namedItem(
                'title',
              ) as HTMLInputElement;

              const value = input.value.trim();

              if (!value) {
                return;
              }

              dispatch({ type: 'add', payload: value });

              e.currentTarget.reset();
            }}
          >
            <input
              ref={inputRef}
              name="title"
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              autoFocus
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeCount} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                data-cy="FilterLinkAll"
                className={classNames('filter__link', {
                  selected: filter === 'All',
                })}
                onClick={() => dispatch({ type: 'setFilter', payload: 'All' })}
              >
                All
              </a>

              <a
                href="#/active"
                data-cy="FilterLinkActive"
                className={classNames('filter__link', {
                  selected: filter === 'Active',
                })}
                onClick={() =>
                  dispatch({ type: 'setFilter', payload: 'Active' })
                }
              >
                Active
              </a>

              <a
                href="#/completed"
                data-cy="FilterLinkCompleted"
                className={classNames('filter__link', {
                  selected: filter === 'Completed',
                })}
                onClick={() =>
                  dispatch({ type: 'setFilter', payload: 'Completed' })
                }
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!hasCompleted}
              onClick={() => dispatch({ type: 'clearCompleted' })}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
