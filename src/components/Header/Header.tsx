import React, { useEffect, useRef, useState } from 'react';

interface HeaderProps {
  addTodo: (text: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, []);

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();
    if (title.trim()) {
      addTodo(title);
      setTitle('');
    }

    if (titleField.current) {
      titleField.current.focus();
    }
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleAddTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          ref={titleField}
        />
      </form>
    </header>
  );
};
