import React, { useContext, useEffect, useRef, useState } from 'react';
import { StateContext } from '../Store';
import cn from 'classnames';

type Props = {
  focusSignal: number;
  onSubmit: (title: string) => void;
  onToggleAllButton: () => void;
};

export const Header: React.FC<Props> = ({
  onSubmit,
  focusSignal,
  onToggleAllButton,
}) => {
  const [title, setTitle] = useState<string>('');

  const { todos } = useContext(StateContext);

  const titleField = useRef<HTMLInputElement>(null);

  const reset = () => setTitle('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim().length === 0) {
      titleField.current?.focus();
      setTitle('');

      return;
    }

    onSubmit(title.trim());

    reset();
  };

  useEffect(() => {
    titleField.current?.focus();
  }, [focusSignal]);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed === true),
          })}
          data-cy="ToggleAllButton"
          onClick={onToggleAllButton}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          ref={titleField}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleTitleChange}
        />
      </form>
    </header>
  );
};
