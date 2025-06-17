import React, { useState, useEffect, useRef } from 'react';
import { useTodos } from './TodoContext';
import { TodoItem } from './TodoItem';

export const TodoApp: React.FC = () => {
  const {
    todos,
    addTodo,
    toggleAll,
    clearCompleted,
    filter,
    setFilter,
    toggleTodo,
    removeTodo,
    updateTodo,
  } = useTodos();

  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Focus input on initial load
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();

    if (trimmed) {
      addTodo(trimmed);
      setTitle('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const handleDelete = (id: number) => {
    removeTodo(id);
    setTimeout(() => {
      inputRef.current?.focus(); // Focus input after deletion
    }, 0);
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

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedExist = todos.some(todo => todo.completed);
  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={`todoapp__toggle-all${allCompleted ? ' active' : ''}`}
              data-cy="ToggleAllButton"
              onClick={toggleAll}
            />
          )}

          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  toggleTodo={toggleTodo}
                  deleteTodo={handleDelete}
                  updateTodo={updateTodo}
                />
              ))}
            </section>

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {activeCount} items left
              </span>

              <nav className="filter" data-cy="Filter">
                {(['all', 'active', 'completed'] as const).map(type => (
                  <a
                    key={type}
                    href={`#/${type}`}
                    className={`filter__link${filter === type ? ' selected' : ''}`}
                    onClick={e => {
                      e.preventDefault();
                      setFilter(type);
                    }}
                    data-cy={`FilterLink${type[0].toUpperCase()}${type.slice(1)}`}
                  >
                    {type[0].toUpperCase() + type.slice(1)}
                  </a>
                ))}
              </nav>

              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                onClick={() => {
                  clearCompleted();
                  requestAnimationFrame(() => {
                    inputRef.current?.focus();
                  });
                }}
                disabled={!completedExist}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>
    </div>
  );
};
