import React, { useState } from 'react';
import { useTodos } from '../context/TodoContext';
import { TodoList } from './TodoList';
import { Filter } from '../types/Todo';

export const TodoApp: React.FC = () => {
  const { todos, filter, setFilter, addTodo, clearCompleted, toggleAll } =
    useTodos();

  const [newTodo, setNewTodo] = useState('');

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const allCompleted =
    todos.length > 0 && completedTodos.length === todos.length;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const title = newTodo.trim();

    if (!title) {
      return;
    }

    addTodo(title);
    setNewTodo('');
  };

  const filters: { label: string; value: Filter; href: string }[] = [
    { label: 'All', value: 'all', href: '#/' },
    { label: 'Active', value: 'active', href: '#/active' },
    { label: 'Completed', value: 'completed', href: '#/completed' },
  ];

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
              data-cy="ToggleAllButton"
              onClick={toggleAll}
            />
          )}

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={event => setNewTodo(event.target.value)}
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <TodoList />

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {activeTodos.length} items left
              </span>

              <nav className="filter" data-cy="Filter">
                {filters.map(({ label, value, href }) => (
                  <a
                    key={value}
                    href={href}
                    className={`filter__link ${
                      filter === value ? 'selected' : ''
                    }`}
                    data-cy={`FilterLink${label === 'All' ? 'All' : label}`}
                    onClick={event => {
                      event.preventDefault();
                      setFilter(value);
                    }}
                  >
                    {label}
                  </a>
                ))}
              </nav>

              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                disabled={completedTodos.length === 0}
                onClick={clearCompleted}
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
