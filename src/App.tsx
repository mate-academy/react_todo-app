/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { useTodos } from './components/TodosContext';
import classNames from 'classnames';
import { TodoFilter } from './types/TodosContexType';

export const App: React.FC = () => {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    removeTodo,
    clearCompleted,
    updateTodoTitle,
    toggleAllTodos,
  } = useTodos();
  const [newTitle, setNewTitle] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const fieldRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredTodos = todos.filter(todo => {
    if (filter === TodoFilter.Active) {
      return !todo.completed;
    }

    if (filter === TodoFilter.Completed) {
      return todo.completed;
    }

    return true;
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const allCompletedTodos =
    todos.length > 0 && todos.every(todo => todo.completed);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newTitle.trim()) {
      addTodo(newTitle);
      setNewTitle('');
    }
  };

  const handleEditStart = (id: number) => {
    setEditingId(id);
    setTimeout(() => fieldRef.current?.focus(), 0);
  };

  const save = (id: number, newTitleTodo: string) => {
    updateTodoTitle(id, newTitleTodo);
    setEditingId(null);
  };

  const filterLinks = [
    { filter: TodoFilter.All, label: 'All' },
    { filter: TodoFilter.Active, label: 'Active' },
    { filter: TodoFilter.Completed, label: 'Completed' },
  ];

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              data-cy="ToggleAllButton"
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: allCompletedTodos,
              })}
              onClick={toggleAllTodos}
            ></button>
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
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <div
              data-cy="Todo"
              key={todo.id}
              className={classNames('todo', { completed: todo.completed })}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  className="todo__status"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
              </label>

              {editingId === todo.id ? (
                <form
                  onSubmit={event => {
                    event.preventDefault();
                    save(todo.id, fieldRef.current?.value || '');
                  }}
                >
                  <input
                    data-cy="TodoTitleField"
                    ref={fieldRef}
                    type="text"
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    defaultValue={todo.title}
                    onBlur={() => save(todo.id, fieldRef.current?.value || '')}
                    onKeyUp={event => {
                      if (event.key === 'Escape') {
                        setEditingId(null);
                      }
                    }}
                  />
                </form>
              ) : (
                <>
                  <span
                    data-cy="TodoTitle"
                    className="todo__title"
                    onDoubleClick={() => handleEditStart(todo.id)}
                  >
                    {todo.title}
                  </span>
                  <button
                    data-cy="TodoDelete"
                    type="button"
                    className="todo__remove"
                    onClick={() => removeTodo(todo.id)}
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
              {filterLinks.map(({ filter: currentFilter, label }) => (
                <a
                  key={currentFilter}
                  data-cy={`FilterLink${label}`}
                  href={`#${currentFilter === TodoFilter.All ? '' : currentFilter}`}
                  className={classNames('filter__link', {
                    selected: filter === currentFilter,
                  })}
                  onClick={() => setFilter(currentFilter)}
                >
                  {label}
                </a>
              ))}
            </nav>
            <button
              data-cy="ClearCompletedButton"
              type="button"
              className="todoapp__clear-completed"
              onClick={clearCompleted}
              disabled={!todos.some(todo => todo.completed)}
            >
              Clear Completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
