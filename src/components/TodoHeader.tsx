import React, { useEffect, useRef } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  onAdd: (title: string) => void;
  todos: Todo[];
  disabled: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  toggleAll: () => void;
};

export const TodoHeader: React.FC<Props> = ({
  onAdd,
  todos,
  disabled,
  value,
  setValue,
  toggleAll,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(value);
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${todos.every(todo => todo.completed) && `active`}`}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={onSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={e => setValue(e.target.value)}
          disabled={disabled}
          ref={inputRef}
        />
      </form>
    </header>
  );
};
