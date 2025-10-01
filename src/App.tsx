/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodoList } from './TodoList';
import { Context, Todo } from './Context/Context';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const { state, dispatch } = useContext(Context);

  const allCompleted = state.todos.every(todo => todo.completed === true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const todos: Todo[] = JSON.parse(localStorage.getItem('todos')) || [];

    const newTodo: Todo = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
    };

    const updatedTodos = [...todos, newTodo];

    localStorage.setItem('todos', JSON.stringify(updatedTodos));

    dispatch({ type: 'ADD_TODO', payload: newTodo });

    setTitle('');
  };

  const handleFilterTodo = param => {
    const todos: Todo[] = JSON.parse(localStorage.getItem('todos')) || [];

    if (param === 'ACTIVE') {
      const activeTodos = todos.filter(todo => todo.completed === false);

      dispatch({ type: 'SET_TODOS', payload: activeTodos });
    }

    if (param === 'COMPLETED') {
      const activeTodos = todos.filter(todo => todo.completed === true);

      dispatch({ type: 'SET_TODOS', payload: activeTodos });
    }

    if (param === 'ALL') {
      dispatch({ type: 'SET_TODOS', payload: todos });
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleToogleButton = () => {
    if (allCompleted) {
      dispatch({ type: 'CHANGE_STATUS', payload: 22 });
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
            onClick={handleToogleButton}
          />

          {/* Add a todo on form submit */}
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

        <TodoList inputRef={inputRef} />

        {state.todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {state.todos.length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className="filter__link selected"
                data-cy="FilterLinkAll"
                onClick={() => handleFilterTodo('ALL')}
              >
                All
              </a>

              <a
                href="#/active"
                className="filter__link"
                data-cy="FilterLinkActive"
                onClick={() => handleFilterTodo('ACTIVE')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className="filter__link"
                data-cy="FilterLinkCompleted"
                onClick={() => handleFilterTodo('COMPLETED')}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
