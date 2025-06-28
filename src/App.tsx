/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useRef, useEffect } from 'react';
import { TodoProvider, useTodos } from './TodoContext';
import { StatusFilter } from './types';
import { TodoItem } from './TodoItem';

const TodoApp: React.FC = () => {
  const { todos, filter, addTodo, toggleAll, clearCompleted, setFilter } =
    useTodos();

  const [newTodoTitle, setNewTodoTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const prevTodosLength = useRef(todos.length);

  useEffect(() => {
    if (todos.length < prevTodosLength.current && inputRef.current) {
      inputRef.current.focus();
    }

    prevTodosLength.current = todos.length;
  }, [todos.length]);

  const filteredTodos = todos.filter(todo => {
    if (filter === StatusFilter.Active) {
      return !todo.completed;
    }

    if (filter === StatusFilter.Completed) {
      return todo.completed;
    }

    return true;
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);
  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoTitle.trim()) {
      addTodo(newTodoTitle);
      setNewTodoTitle('');
    }
  };

  if (todos.length === 0) {
    return (
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>
        <div className="todoapp__content">
          <header className="todoapp__header">
            <form onSubmit={handleAddTodo}>
              <input
                ref={inputRef}
                data-cy="NewTodoField"
                type="text"
                className="todoapp__new-todo"
                placeholder="What needs to be done?"
                value={newTodoTitle}
                onChange={e => setNewTodoTitle(e.target.value)}
                autoFocus
              />
            </form>
          </header>
        </div>
      </div>
    );
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
            data-cy="ToggleAllButton"
            onClick={toggleAll}
          />

          <form onSubmit={handleAddTodo}>
            <input
              ref={inputRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodoTitle}
              onChange={e => setNewTodoTitle(e.target.value)}
              autoFocus
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </section>

        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {activeTodosCount} items left
          </span>

          <nav className="filter" data-cy="Filter">
            {Object.values(StatusFilter).map(filterType => (
              <a
                key={filterType}
                href={`#/${filterType}`}
                className={`filter__link ${filter === filterType ? 'selected' : ''}`}
                data-cy={`FilterLink${filterType.charAt(0).toUpperCase() + filterType.slice(1)}`}
                onClick={e => {
                  e.preventDefault();
                  setFilter(filterType);
                }}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            disabled={!hasCompletedTodos}
            onClick={clearCompleted}
          >
            Clear completed
          </button>
        </footer>
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
