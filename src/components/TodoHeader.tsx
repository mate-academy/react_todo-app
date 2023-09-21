import React, { useState } from 'react';

import { Todo } from '../types/Todo';
import { ErrorMessages } from '../types/ErrorNessages';

type Props = {
  isTodoShow: boolean,
  newTodoTitle: string,
  handleNewTodoTitle: (
    newTodoTitle: React.ChangeEvent<HTMLInputElement>
  ) => void,
  addNewTodo: (title: string) => Promise<Todo | null>,
  checkAllTodos: () => void;
};

export const TodoHeader: React.FC<Props> = ({
  isTodoShow,
  newTodoTitle,
  handleNewTodoTitle,
  addNewTodo,
  checkAllTodos,
}) => {
  const [todoAdd, setTodoAdd] = useState(false);

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTodoAdd(true);

    try {
      const newTodo = await addNewTodo(newTodoTitle);

      if (newTodo === null) {
        throw new Error(ErrorMessages.AddError);
      }
    } catch (error) {
      throw new Error(ErrorMessages.AddError);
    } finally {
      setTodoAdd(false);
    }
  };

  return (
    <header className="todoapp__header">
      {isTodoShow && (
        <button
          type="button"
          className="todoapp__toggle-all active"
          aria-label="btn"
          onClick={checkAllTodos}
        />
      )}

      <form onSubmit={submitForm}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={(event) => handleNewTodoTitle(event)}
          disabled={todoAdd}
        />
      </form>
    </header>
  );
};
