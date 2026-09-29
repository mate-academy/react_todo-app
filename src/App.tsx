/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { useTodoContext } from './context/TodoContext';
import { TodoItem } from './components/TodoItem';
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  const { todos, addTodo, toggleAll, clearCompleted } = useTodoContext();

  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.all);
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');

  const inpuRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inpuRef.current) {
      inpuRef.current.focus();
    }
  }, [todos]);

  function handleAddTodo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (newTodoTitle.trim()) {
      addTodo(newTodoTitle.trim());
      setNewTodoTitle('');
    }
  }

  const filteredTodos = todos.filter(todo => {
    return (
      filter === FilterStatus.all ||
      (filter === FilterStatus.active && !todo.completed) ||
      (filter === FilterStatus.completed && todo.completed)
    );
  });

  const activeTodosCount = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  const completedTodosCount = useMemo(
    () => todos.filter(todo => todo.completed).length,
    [todos],
  );

  const isAllCompleted = useMemo(
    () => todos.every(todo => todo.completed),
    [todos],
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todos.length > 0 && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', { active: isAllCompleted })}
              data-cy="ToggleAllButton"
              onClick={toggleAll}
            />
          )}

          {/* Add a todo on form submit */}
          <form onSubmit={handleAddTodo}>
            <input
              ref={inpuRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              value={newTodoTitle}
              onChange={event => setNewTodoTitle(event.target.value)}
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

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodosCount} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: filter === FilterStatus.all,
                })}
                data-cy="FilterLinkAll"
                onClick={() => setFilter(FilterStatus.all)}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: filter === FilterStatus.active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => setFilter(FilterStatus.active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: filter === FilterStatus.completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilter(FilterStatus.completed)}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={completedTodosCount === 0}
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
