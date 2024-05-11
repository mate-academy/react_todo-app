import React from 'react';
import { TodoForm } from '../TodoForm/TodoForm';

export function Header() {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <TodoForm />
    </header>
  );
}
