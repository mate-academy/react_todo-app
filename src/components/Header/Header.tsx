import { useState } from 'react';
import {
  useTodoContextState,
  useTodoContextUpdater,
} from '../context/TodoContext';

export const Header = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const { headerInputRef, todos } = useTodoContextState();
  const { addTodo, toggleMultipleTodosStatus } = useTodoContextUpdater();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (todoTitle.trim()) {
      addTodo(todoTitle);
      setTodoTitle('');
    }
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${todos.every(todo => todo.completed) ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={toggleMultipleTodosStatus}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          ref={headerInputRef}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={event => setTodoTitle(event.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
