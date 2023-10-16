import React, { useState } from 'react';
import { createTodos } from '../../api';
import { Todo } from '../../types/Todo';
import { Errors } from '../../types/ErrorMessages';

const userId = 11065;

type NewTodoFormType = {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<Errors>>,
  showAndDeleteError: (timer?: number) => NodeJS.Timeout,
};

export const NewTodoForm: React.FC<NewTodoFormType> = ({
  setTodos,
  setIsError,
  setErrorMessage,
  showAndDeleteError,
}) => {
  const [query, setQuery] = useState('');

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query.trim()) {
      createTodos({
        title: query,
        userId,
        completed: false,
      })
        .then((res) => {
          setTodos(prevTodos => [...prevTodos, res]);
        })
        .catch(() => {
          setIsError(true);
          setErrorMessage(Errors.Add);
        })
        .finally(() => showAndDeleteError());

      setQuery('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        data-cy="createTodo"
        value={query}
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={handleQueryChange}
      />
    </form>
  );
};
