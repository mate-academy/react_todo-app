import React, { useEffect, useRef } from 'react';

interface Props {
  newTodoTitle: string,
  newTodoTitleHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
  submitNewTodoHandler: (event: React.FormEvent<HTMLFormElement>) => void,
  isAdding: boolean,
}

export const NewTodo: React.FC<Props> = ({
  newTodoTitle,
  newTodoTitleHandler,
  submitNewTodoHandler,
  isAdding,
}) => {
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, [isAdding]);

  return (
    <form onSubmit={(event) => submitNewTodoHandler(event)}>
      <input
        data-cy="NewTodoField"
        type="text"
        ref={newTodoField}
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={newTodoTitle}
        disabled={isAdding}
        onChange={newTodoTitleHandler}
      />
    </form>
  );
};
