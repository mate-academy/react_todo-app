import React, { FC, useState } from 'react';
import { createNewTodo } from '../../api/todos';
import { USER_ID } from '../../constants';
import { ErrorType } from '../../types/Error';
import { Todo } from '../../types/Todo';

type Props = {
  setTempTodo: React.Dispatch<React.SetStateAction<Todo | null>>
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  setError: React.Dispatch<React.SetStateAction<ErrorType>>;
  setProcessingTodoIds: React.Dispatch<React.SetStateAction<number[]>>;
};

export const Header: FC<Props> = ({
  setError,
  setTempTodo,
  setTodos,
  setProcessingTodoIds,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [newTodoQuery, setNewTodoQuery] = useState('');

  const addTodo = async () => {
    try {
      setIsLoading(true);
      setTempTodo({
        id: 0,
        userId: USER_ID,
        title: newTodoQuery,
        completed: false,
      });
      setProcessingTodoIds(prevState => [...prevState, 0]);

      const newTodo = await createNewTodo(USER_ID, newTodoQuery);

      setTodos(prevTodos => ([...prevTodos, newTodo]));
    } catch (err) {
      setError(ErrorType.ADD);
    } finally {
      setIsLoading(false);
      setTempTodo(null);
      setProcessingTodoIds(
        prevState => prevState.filter(item => item !== 0),
      );
    }
  };

  const handleOnNewTodoInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setError(ErrorType.NONE);
    setNewTodoQuery(event.target.value);
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newTodoQuery.trim()) {
      setError(ErrorType.EMPTY);

      return;
    }

    addTodo();
    setNewTodoQuery('');
  };

  return (
    <header className="todoapp__header">
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}

      <form onSubmit={handleOnSubmit}>
        <input
          disabled={isLoading}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoQuery}
          onChange={handleOnNewTodoInputChange}
          data-cy="createTodo"
        />
      </form>
    </header>
  );
};
