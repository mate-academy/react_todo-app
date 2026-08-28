import React, { useEffect, useRef, useState } from 'react';

import { TodoProvider, useTodos } from './context/TodoContext';

/* eslint-disable jsx-a11y/control-has-associated-label, jsx-a11y/label-has-associated-control */

export const TodoApp: React.FC = () => {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    toggleAll,
    updateTodo,
  } = useTodos();

  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const cancelEdit = useRef(false);
  const newTodoFieldRef = useRef<HTMLInputElement>(null);

  const focusNewTodoField = () => {
    newTodoFieldRef.current?.focus();
  };

  useEffect(() => {
    newTodoFieldRef.current?.focus();
  }, [todos.length]);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const filters: {
    href: string;
    value: 'all' | 'active' | 'completed';
    label: string;
    testId: string;
  }[] = [
    {
      href: '#/',
      value: 'all',
      label: 'All',
      testId: 'FilterLinkAll',
    },
    {
      href: '#/active',
      value: 'active',
      label: 'Active',
      testId: 'FilterLinkActive',
    },
    {
      href: '#/completed',
      value: 'completed',
      label: 'Completed',
      testId: 'FilterLinkCompleted',
    },
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const title = newTodoTitle.trim();

    if (!title) {
      return;
    }

    addTodo(title);
    setNewTodoTitle('');
  };

  const saveEdit = () => {
    if (editingTodoId === null) {
      return;
    }

    const title = editingTitle.trim();

    if (!title) {
      deleteTodo(editingTodoId);
    } else {
      updateTodo(editingTodoId, title);
    }

    setEditingTodoId(null);
    setEditingTitle('');
  };

  const handleEditSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    cancelEdit.current = false;
    saveEdit();
  };

  const handleEditBlur = () => {
    if (cancelEdit.current) {
      cancelEdit.current = false;

      return;
    }

    saveEdit();
  };

  const handleEditKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      cancelEdit.current = true;
      setEditingTodoId(null);
      setEditingTitle('');
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={`todoapp__toggle-all ${
                todos.every(todo => todo.completed) ? 'active' : ''
              }`}
              data-cy="ToggleAllButton"
              onClick={() => {
                toggleAll();
                focusNewTodoField();
              }}
            />
          )}

          <form onSubmit={handleSubmit}>
            <input
              ref={newTodoFieldRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodoTitle}
              onChange={event => setNewTodoTitle(event.target.value)}
              autoFocus
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {visibleTodos.map(todo => (
            <div
              key={todo.id}
              data-cy="Todo"
              className={`todo ${todo.completed ? 'completed' : ''}`}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onChange={() => {
                    toggleTodo(todo.id);
                    focusNewTodoField();
                  }}
                />
              </label>

              {editingTodoId === todo.id ? (
                <form onSubmit={handleEditSubmit}>
                  <input
                    data-cy="TodoTitleField"
                    type="text"
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    value={editingTitle}
                    onChange={event => setEditingTitle(event.target.value)}
                    onBlur={handleEditBlur}
                    onKeyUp={handleEditKeyUp}
                    autoFocus
                  />
                </form>
              ) : (
                <>
                  <span
                    data-cy="TodoTitle"
                    className="todo__title"
                    onDoubleClick={() => {
                      cancelEdit.current = false;
                      setEditingTodoId(todo.id);
                      setEditingTitle(todo.title);
                    }}
                  >
                    {todo.title}
                  </span>

                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                    onClick={() => {
                      deleteTodo(todo.id);
                      focusNewTodoField();
                    }}
                  >
                    ×
                  </button>
                </>
              )}
            </div>
          ))}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodosCount} items left
            </span>

            <nav className="filter" data-cy="Filter">
              {filters.map(filterItem => (
                <a
                  key={filterItem.value}
                  href={filterItem.href}
                  className={`filter__link ${
                    filter === filterItem.value ? 'selected' : ''
                  }`}
                  data-cy={filterItem.testId}
                  onClick={() => {
                    setFilter(filterItem.value);
                    focusNewTodoField();
                  }}
                >
                  {filterItem.label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={() => {
                clearCompleted();
                focusNewTodoField();
              }}
              disabled={!todos.some(todo => todo.completed)}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
};
