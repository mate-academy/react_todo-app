/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useTodos } from '../context/TodoContext';
import { TodoList } from './TodoList';
import { Footer } from './Footer';
import { TodoForm } from './TodoForm';

export const TodoApp: React.FC = () => {
  const { todos, toggleAll } = useTodos();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">Todo list</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}

          {todos.length > 0 && (
            <button
              type="button"
              className={`todoapp__toggle-all ${todos.every(todo => todo.completed) ? 'active' : ''}`}
              data-cy="ToggleAllButton"
              onClick={() => toggleAll(!todos.every(todo => todo.completed))}
            />
          )}
          {/* Add a todo on form submit */}
          <TodoForm />
        </header>

        {todos.length > 0 && <TodoList />}
        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};
