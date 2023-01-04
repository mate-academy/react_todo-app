import React from 'react';

type Props = {
  newTodoField: React.RefObject<HTMLInputElement>;
  isAdding: boolean;
  value: string,
  setValue: (event: React.HTMLInputTypeAttribute) => void;
  handleSubmit: (event: React.FormEvent) => void;
  placeholder?: string;
  className: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
};

export const TodoTitleField: React.FC<Props> = ({
  newTodoField,
  isAdding,
  value,
  setValue,
  handleSubmit,
  placeholder,
  onBlur,
  onKeyDown,
  className,
}) => {
  return (
    <form onSubmit={event => handleSubmit(event)}>
      <input
        data-cy="createTodo"
        type="text"
        ref={newTodoField}
        className={className}
        placeholder={placeholder}
        disabled={isAdding}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
    </form>
  );
};
