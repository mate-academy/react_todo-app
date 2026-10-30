/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { TodoCounter } from './components/TodoCounter';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList/TodoList';
import { useTodos, useTodosDispatch } from './store/TodosStore';
import { TotalTodos } from './components/TotalTodos/TotalTodos';

export const App: React.FC = () => {
  const todos = useTodos();
  const hasCompletedTodos = todos.some(todo => todo.completed);
  const allCompleted = todos.every(todo => todo.completed);

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const dispatch = useTodosDispatch();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <TotalTodos />

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
              data-cy="ToggleAllButton"
              onClick={() => dispatch({ type: 'toggleAll' })}
            />
          )}

          <TodoForm />
        </header>

        <TodoList filter={filter} />

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <TodoCounter />

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
                onClick={() => setFilter('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
                onClick={() => setFilter('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilter('completed')}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={() => dispatch({ type: 'clearCompleted' })}
              disabled={!hasCompletedTodos}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
