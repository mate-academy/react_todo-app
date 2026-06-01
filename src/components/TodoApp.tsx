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
          {!!todos.length && (
            <button
              type="button"
              className={`todoapp__toggle-all ${todos.every(todo => todo.completed) ? 'active' : ''}`}
              data-cy="ToggleAllButton"
              onClick={() => toggleAll(!todos.every(todo => todo.completed))}
            />
          )}
          <TodoForm />
        </header>

        {!!todos.length && <TodoList />}
        {!!todos.length && <Footer />}
      </div>
    </div>
  );
};
