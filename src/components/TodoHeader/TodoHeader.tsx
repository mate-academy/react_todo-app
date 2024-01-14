/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useTodoContext } from '../../store/TodoContext';

type Props = {
  addTodo: (newTodoTitle: string) => void;
  newTodoTitle: string;
  setNewTodoTitle: (newTodoTitle: string) => void;
};

export const TodoHeader: React.FC<Props> = ({
  addTodo,
  newTodoTitle,
  setNewTodoTitle,
}) => {
  const {
    inputLine,
  } = useTodoContext();

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedNewTodoTitle = newTodoTitle.trim();

    addTodo(trimmedNewTodoTitle);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTodoTitle}
        onChange={onTitleChange}
        ref={inputLine}
      />
    </form>
  );
};
