import React from 'react';
import { useTodos } from '../context/TodoContext';

type Props = {
  title: string;
  onAdd: (e: React.FormEvent) => void;
  onChangeTitle: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

export const TodoHeader: React.FC<Props> = ({
  title,
  onAdd,
  onChangeTitle,
  inputRef,
}) => {
  const { todos, loading, toggleAll } = useTodos();

  const hasTodos = todos.length > 0;
  const allCompleted = hasTodos && todos.every(t => t.completed);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {hasTodos && (
        <button
          type="button"
          className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={() => void toggleAll()}
          disabled={loading}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={onAdd}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => onChangeTitle(e.target.value)}
          disabled={loading}
          autoFocus
          ref={inputRef}
        />
      </form>
    </header>
  );
};
