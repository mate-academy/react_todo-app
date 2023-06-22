import React, { useEffect, useRef, useState } from 'react';

import { PatchTodo } from 'types/PatchTodo';
import { Todo } from 'types/Todo';

type Props = {
  todo: Todo;
  onNeedChange: (value: boolean) => void;
  changeTodo: (id: number, data: PatchTodo) => void;
  removeTodo: (id: number) => void;
};

export const NewTodo: React.FC<Props> = React.memo(({
  todo,
  onNeedChange,
  changeTodo,
  removeTodo,
}) => {
  const { id, title } = todo;

  const [newTitle, setNewTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (e: React.BaseSyntheticEvent) => {
    setNewTitle(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Escape') {
      setNewTitle(title);
      onNeedChange(false);
    }
  };

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    if (!newTitle) {
      await removeTodo(id);
      onNeedChange(false);

      return;
    }

    if (newTitle === title) {
      onNeedChange(false);

      return;
    }

    onNeedChange(false);
    changeTodo(id, { title: newTitle });
  };

  const handleBlur = async (e: React.BaseSyntheticEvent) => {
    handleSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="todo__title-field"
        placeholder="Empty todo will be deleted"
        value={newTitle}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        ref={inputRef}
      />
    </form>
  );
});
