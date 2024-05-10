import React, { useState } from 'react';
import { Todo } from '../Types/Todo';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const Header: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title.trim()) {
      onSubmit({
        id: Number(new Date()),
        title,
        status: false,
      });
    }

    setTitle('');
  };

  return (
    <header className="todoapp__header">
      <>
        {/* this button should have `active` class only if all todos are completed */}
        <button
          type="button"
          className="todoapp__toggle-all active"
          data-cy="ToggleAllButton"
        />
        {/* Add a todo on form submit */}
        <form onSubmit={handleSubmit}>
          <input
            data-cy="NewTodoField"
            type="text"
            value={title}
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            onChange={e => setTitle(e.target.value)}
          />
        </form>
      </>
    </header>
  );
};
