/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useTodos } from './TodoContext';
import { Filter } from './types/todo';

const getFilterFromHash = (hash: string): Filter => {
  switch (hash) {
    case '#/active':
      return Filter.ACTIVE;
    case '#/completed':
      return Filter.COMPLETED;
    default:
      return Filter.ALL;
  }
};

export const App: React.FC = () => {
  const {
    todos,
    addTodo,
    toggleTodo,
    updateTodo,
    removeTodo,
    clearCompleted,
    toggleAll,
  } = useTodos();
  const [newTitle, setNewTitle] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const newTodoFieldRef = useRef<HTMLInputElement>(null);
  const [ignoreBlurSave, setIgnoreBlurSave] = useState(false);
  const [filter, setFilter] = useState<Filter>(() =>
    getFilterFromHash(window.location.hash),
  );
  const hasCompletedTodos = todos.some(todo => todo.completed);
  const allTodosCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  useEffect(() => {
    const handleHashChange = () => {
      setFilter(getFilterFromHash(window.location.hash));
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    newTodoFieldRef.current?.focus();
  }, []);

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case Filter.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case Filter.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [filter, todos]);

  const handleNewTodoKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();
    const trimmedTitle = newTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    addTodo(trimmedTitle);
    setNewTitle('');
  };

  const handleRemoveTodo = (id: number) => {
    removeTodo(id);
    newTodoFieldRef.current?.focus();
  };

  const handleStartEditing = (id: number, title: string) => {
    setEditingTodoId(id);
    setEditingTitle(title);
  };

  const handleCancelEditing = () => {
    setEditingTodoId(null);
    setEditingTitle('');
  };

  const handleSaveEditing = (id: number) => {
    const trimmedTitle = editingTitle.trim();

    if (!trimmedTitle) {
      removeTodo(id);
    } else {
      updateTodo(id, trimmedTitle);
    }

    handleCancelEditing();
  };

  const handleClearCompleted = () => {
    clearCompleted();
    newTodoFieldRef.current?.focus();
  };

  const handleToggleAll = () => {
    toggleAll(!allTodosCompleted);
  };

  const handleEditBlur = (todoId: number) => {
    if (ignoreBlurSave) {
      setIgnoreBlurSave(false);

      return;
    }

    handleSaveEditing(todoId);
  };

  const handleEditKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIgnoreBlurSave(true);
      handleCancelEditing();
    }
  };

  /* eslint-disable jsx-a11y/label-has-associated-control */
  /* eslint-disable jsx-a11y/control-has-associated-label */

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: allTodosCompleted,
              })}
              data-cy="ToggleAllButton"
              onClick={handleToggleAll}
            />
          )}

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              ref={newTodoFieldRef}
              value={newTitle}
              onChange={event => setNewTitle(event.target.value)}
              onKeyDown={handleNewTodoKeyDown}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {visibleTodos.map(todo => {
            const isEditing = editingTodoId === todo.id;

            return (
              <div
                key={todo.id}
                data-cy="Todo"
                className={classNames('todo', { completed: todo.completed })}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                </label>

                {!isEditing && (
                  <span
                    data-cy="TodoTitle"
                    className="todo__title"
                    onDoubleClick={() =>
                      handleStartEditing(todo.id, todo.title)
                    }
                  >
                    {todo.title}
                  </span>
                )}

                {isEditing && (
                  <form
                    onSubmit={event => {
                      event.preventDefault();
                      handleSaveEditing(todo.id);
                    }}
                  >
                    <input
                      data-cy="TodoTitleField"
                      type="text"
                      className="todo__title-field"
                      placeholder="Empty todo will be deleted"
                      value={editingTitle}
                      autoFocus
                      onChange={event => setEditingTitle(event.target.value)}
                      onBlur={() => handleEditBlur(todo.id)}
                      onKeyUp={handleEditKeyUp}
                    />
                  </form>
                )}

                {!isEditing && (
                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                    onClick={() => handleRemoveTodo(todo.id)}
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filter === Filter.ALL,
                })}
                data-cy="FilterLinkAll"
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filter === Filter.ACTIVE,
                })}
                data-cy="FilterLinkActive"
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filter === Filter.COMPLETED,
                })}
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!hasCompletedTodos}
              onClick={handleClearCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
