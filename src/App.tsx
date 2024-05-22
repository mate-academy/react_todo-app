/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { DispatchContext, StateContext } from './context/Store';

import cn from 'classnames';

export const App: React.FC = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [newTodo, setNewTodo] = useState('');

  const filteredTodos = state.todos.filter(todo => {
    switch (state.filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      case 'all':
      default:
        return true;
    }
  });

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo.trim() !== '') {
      dispatch({ type: 'add', payload: newTodo });
      setNewTodo('');
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
            className={cn('todoapp__toggle-all', {
              active: state.todos.every(todo => todo.completed),
            })}
            data-cy="ToggleAllButton"
            onClick={() => dispatch({ type: 'toggleAll' })}
          />

          {/* Add a todo on form submit */}
          <form onSubmit={handleAddTodo}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={e => setNewTodo(e.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <div
              key={todo.id}
              data-cy="Todo"
              className={`todo ${todo.completed ? 'completed' : ''}`}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onChange={() =>
                    dispatch({ type: 'markCompleted', payload: todo.id })
                  }
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {todo.title}
              </span>

              {/* Remove button appears only on hover */}
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => dispatch({ type: 'delete', payload: todo.id })}
              >
                ×
              </button>
            </div>
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {state.todos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${state.todos.filter(todo => !todo.completed).length} items left`}
            </span>
            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                // className="filter__link selected"
                className={cn('filter__link', {
                  selected: state.filter === 'all',
                })}
                data-cy="FilterLinkAll"
                onClick={() => dispatch({ type: 'setFilter', payload: 'all' })}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: state.filter === 'active',
                })}
                data-cy="FilterLinkActive"
                onClick={() =>
                  dispatch({ type: 'setFilter', payload: 'active' })
                }
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: state.filter === 'completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() =>
                  dispatch({ type: 'setFilter', payload: 'completed' })
                }
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={() => dispatch({ type: 'clearCompleted' })}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
