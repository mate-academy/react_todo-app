import React, { RefObject, useState } from 'react';

interface Props {
  newTodoField: RefObject<HTMLInputElement>;
  createTodo: (title: string) => void;
  isAdding: boolean;
}

export const NewTodoField: React.FC<Props> = ({
  newTodoField, createTodo, isAdding,
}) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createTodo(newTodoTitle);
    setNewTodoTitle('');
  };

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };

  return (
    <form
      onSubmit={submitHandler}
    >
      <input
        data-cy="NewTodoField"
        type="text"
        ref={newTodoField}
        className="new-todo"
        placeholder="What needs to be done?"
        value={String(newTodoTitle)}
        disabled={isAdding}
        onChange={changeTitle}
      />
    </form>
  );
};
