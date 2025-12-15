/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { useTodos } from './context/TodoContext';
import { TodoItem } from './components/TodoItem/TodoItem';

export const App: React.FC = () => {
  const {
    todos,
    addTodo,
    filter,
    clearCompleted,
    toggleAll,
    setFilter,
    deleteTodo,
    toggleTodo,
    updateTodo,
  } = useTodos();
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const newTodoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    newTodoRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const title = newTodoTitle.trim();

    if (title) {
      addTodo(title);
      setNewTodoTitle('');
    }

    newTodoRef.current?.focus();
  };

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;
  const isAllCompleted = todos.length > 0 && activeTodosCount === 0;

  const handleToggleAll = () => {
    toggleAll(!isAllCompleted);
  };

  let visibleTodos = todos;

  if (filter === 'Active') {
    visibleTodos = todos.filter(todo => !todo.completed);
  } else if (filter === 'Completed') {
    visibleTodos = todos.filter(todo => todo.completed);
  }

  const handleFilterChange = (
    e: React.MouseEvent<HTMLAnchorElement>,
    newFilter: 'All' | 'Active' | 'Completed',
  ) => {
    e.preventDefault();
    setFilter(newFilter);
  };

  const handleClearCompleted = () => {
    clearCompleted();
    newTodoRef.current?.focus();
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodo(id);
    newTodoRef.current?.focus();
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={`todoapp__toggle-all ${isAllCompleted ? 'active' : ''}`}
              data-cy="ToggleAllButton"
              onClick={handleToggleAll}
            />
          )}

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodoTitle}
              onChange={e => setNewTodoTitle(e.target.value)}
              ref={newTodoRef}
            />
          </form>
        </header>

        {todos.length > 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {visibleTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                deleteTodo={handleDeleteTodo}
                toggleTodo={toggleTodo}
                updateTodo={updateTodo}
              />
            ))}
          </section>
        )}

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodosCount}{' '}
              {activeTodosCount === 1 ? ' item left' : ' items left'}
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={
                  filter === 'All' ? 'filter__link selected' : 'filter__link'
                }
                data-cy="FilterLinkAll"
                onClick={e => handleFilterChange(e, 'All')}
              >
                All
              </a>

              <a
                href="#/active"
                className={
                  filter === 'Active' ? 'filter__link selected' : 'filter__link'
                }
                data-cy="FilterLinkActive"
                onClick={e => handleFilterChange(e, 'Active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={
                  filter === 'Completed'
                    ? 'filter__link selected'
                    : 'filter__link'
                }
                data-cy="FilterLinkCompleted"
                onClick={e => handleFilterChange(e, 'Completed')}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={handleClearCompleted}
              disabled={!completedTodosCount}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
