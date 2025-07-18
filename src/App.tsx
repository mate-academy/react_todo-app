/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useRef, useState } from 'react';
import { useTodos, Todo } from './contexts/TodosContext';

export const App: React.FC = () => {
  const [newTitle, setNewTitle] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    toggleAll,
    clearCompleted,
    updateTodoTitle,
  } = useTodos();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
  };

  const saveEdit = (id: number) => {
    const trimmed = editTitle.trim();

    if (!trimmed) {
      deleteTodo(id);
    } else {
      updateTodoTitle(id, trimmed);
    }

    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newTitle.trim()) {
      return;
    }

    addTodo(newTitle);
    setNewTitle('');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

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
              onClick={toggleAll}
              aria-pressed={todos.every(todo => todo.completed)}
            />
          )}

          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              autoFocus
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.length === 0 ? (
            <p>No todos yet</p>
          ) : (
            filteredTodos.map(todo => (
              <div
                key={todo.id}
                data-cy="Todo"
                className={`todo${todo.completed ? ' completed' : ''} ${
                  editingId === todo.id ? 'editing' : ''
                }`}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    disabled={editingId === todo.id}
                    aria-label="Toggle todo status"
                  />
                </label>

                {editingId === todo.id ? (
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      saveEdit(todo.id);
                    }}
                  >
                    <input
                      data-cy="TodoTitleField"
                      type="text"
                      className="todo__title-field"
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      onBlur={() => saveEdit(todo.id)}
                      onKeyUp={e => {
                        if (e.key === 'Escape') {
                          cancelEdit();
                        }
                      }}
                      autoFocus
                    />
                  </form>
                ) : (
                  <span
                    data-cy="TodoTitle"
                    className="todo__title"
                    onDoubleClick={() => startEditing(todo)}
                  >
                    {todo.title}
                  </span>
                )}

                {editingId !== todo.id && (
                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                    onClick={() => {
                      deleteTodo(todo.id);
                      inputRef.current?.focus();
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            ))
          )}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
                onClick={e => {
                  e.preventDefault();
                  setFilter('all');
                }}
                data-cy="FilterLinkAll"
              >
                All
              </a>
              <a
                href="#/active"
                className={`filter__link ${
                  filter === 'active' ? 'selected' : ''
                }`}
                onClick={e => {
                  e.preventDefault();
                  setFilter('active');
                }}
                data-cy="FilterLinkActive"
              >
                Active
              </a>
              <a
                href="#/completed"
                className={`filter__link ${
                  filter === 'completed' ? 'selected' : ''
                }`}
                onClick={e => {
                  e.preventDefault();
                  setFilter('completed');
                }}
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={() => {
                clearCompleted();
                inputRef.current?.focus();
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
