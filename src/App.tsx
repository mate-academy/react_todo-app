/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodoContext } from './context/TodoContext';
import { TodoList } from './Components/TodoList/TodoList';

type SortBy = 'All' | 'Active' | 'Completed';

export const App: React.FC = () => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('All');
  const { todos, addTodo, clearCompleted, completeAll } =
    useContext(TodoContext);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos]);

  const getFilteredTodos = (sortMethod: SortBy) => {
    switch (sortMethod) {
      case 'All':
        return todos;
      case 'Active':
        return todos.filter(todo => !todo.completed);
      case 'Completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    title: string,
  ) => {
    event.preventDefault();

    if (title.trim()) {
      addTodo(title);
      setNewTodoTitle('');
    }

    inputRef.current?.focus();
  };

  const visibleTodos = getFilteredTodos(sortBy);

  const focusMainInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        {todos.length === 0 ? (
          <form
            className="todoapp__header"
            onSubmit={event => handleSubmit(event, newTodoTitle)}
          >
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodoTitle}
              onChange={event => setNewTodoTitle(event.target.value)}
              ref={inputRef}
              autoFocus
            />
          </form>
        ) : (
          <>
            <header className="todoapp__header">
              {/* Кнопка ToggleAll (active, якщо всі виконані) */}
              <button
                type="button"
                className={`todoapp__toggle-all ${
                  todos.length > 0 && todos.every(todo => todo.completed)
                    ? 'active'
                    : ''
                }`}
                data-cy="ToggleAllButton"
                onClick={() => completeAll(todos)}
              />

              <form onSubmit={event => handleSubmit(event, newTodoTitle)}>
                <input
                  data-cy="NewTodoField"
                  type="text"
                  className="todoapp__new-todo"
                  placeholder="What needs to be done?"
                  value={newTodoTitle}
                  onChange={event => setNewTodoTitle(event.target.value)}
                  ref={inputRef}
                />
              </form>
            </header>

            <section className="todoapp__main" data-cy="TodoList">
              <TodoList todos={visibleTodos} onEditComplete={focusMainInput} />
            </section>

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {todos.filter(todo => !todo.completed).length}{' '}
                {todos.filter(todo => !todo.completed).length === 1
                  ? 'item left'
                  : 'items left'}
              </span>

              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  data-cy="FilterLinkAll"
                  className={`filter__link ${
                    sortBy === 'All' ? 'selected' : ''
                  }`}
                  onClick={() => setSortBy('All')}
                >
                  All
                </a>

                <a
                  href="#/active"
                  data-cy="FilterLinkActive"
                  className={`filter__link ${
                    sortBy === 'Active' ? 'selected' : ''
                  }`}
                  onClick={() => setSortBy('Active')}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  data-cy="FilterLinkCompleted"
                  className={`filter__link ${
                    sortBy === 'Completed' ? 'selected' : ''
                  }`}
                  onClick={() => setSortBy('Completed')}
                >
                  Completed
                </a>
              </nav>

              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                onClick={() => clearCompleted(todos)}
                disabled={todos.filter(todo => todo.completed).length === 0}
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
