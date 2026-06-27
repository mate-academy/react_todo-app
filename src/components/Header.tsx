// .. Header.tsx

import { useState } from 'react';
import { useTodoContext } from '../hooks/useTodoContext';

export const Header = () => {
  const { addTodo, todos, toggleAll } = useTodoContext();
  const [title, setTitle] = useState<string>('');

  const isAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo(title);
    setTitle('');
  };

  return (
    <>
      <header className="todoapp__header">
        {todos.length > 0 && (
          <button
            type="button"
            className={`todoapp__toggle-all ${isAllCompleted ? 'active' : ''}`}
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
            onChange={handleTitleChange}
            value={title}
            autoFocus
          />
        </form>
      </header>
    </>
  );
};
