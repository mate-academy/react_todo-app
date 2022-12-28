import React, { useEffect, useRef } from 'react';

type Props = {
  title: string;
  onTitleChange: (value: string) => void;
  onToDoAdd: (e: React.FormEvent) => void;
  isAdding: boolean;
};

export const NewToDoField: React.FC<Props> = ({
  title,
  onTitleChange,
  onToDoAdd,
  isAdding,
}) => {
  const newTodoField = useRef<HTMLInputElement>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTitleChange(e.target.value);
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  });

  return (
    <form onSubmit={onToDoAdd}>
      <input
        data-cy="NewTodoField"
        type="text"
        ref={newTodoField}
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={handleTitleChange}
        disabled={isAdding}
      />
    </form>
  );
};
