import cn from 'classnames';
import React, { useState, useRef } from 'react';

type Props = {
  isDisableInput: boolean,
  setError: (title: string) => void,
  handleAddTodo: (title: string) => Promise<void>,
  handleToggleAll: () => void,
  completedTodos: boolean,
};

export const AddInput: React.FC<Props> = React.memo(({
  setError,
  handleAddTodo,
  isDisableInput,
  handleToggleAll,
  completedTodos,
}) => {
  const [input, setInput] = useState('');
  const inputElem = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const title = input.trim();

      if (title) {
        handleAddTodo(title);
        setInput('');
      }
    } catch {
      setError('Title can&#8242;t be empty');
    }
  };

  const handleCancelInput = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (e.key === 'Escape') {
      setInput('');
    }
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        aria-label="All"
        className={cn(
          'todoapp__toggle-all',
          { active: completedTodos },
        )}
        onClick={handleToggleAll}
      />

      <form
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={input}
          disabled={isDisableInput}
          onChange={e => setInput(e.target.value)}
          onKeyUp={handleCancelInput}
          ref={inputElem}
        />
      </form>
    </header>
  );
});
