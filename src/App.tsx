/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';
import { TodoProvider, useTodos } from './TodoContext';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { Filter } from './components/Filter';

const TodoApp: React.FC = () => {
  const { todos, clearCompleted, toggleAll } = useTodos();

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);
  const allCompleted = todos.length > 0 && todos.every(t => t.completed);
  const hasTodos = todos.length > 0;
  const itemWord = activeTodosCount === 1 ? 'item' : 'items';

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {hasTodos && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: allCompleted,
              })}
              data-cy="ToggleAllButton"
              onClick={toggleAll}
            />
          )}

          <TodoForm />
        </header>

        {hasTodos && <TodoList />}

        {hasTodos && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodosCount} {itemWord} left
            </span>

            <Filter />

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
        )}
      </div>
    </div>
  );
};

export const App: React.FC = () => (
  <TodoProvider>
    <TodoApp />
  </TodoProvider>
);
