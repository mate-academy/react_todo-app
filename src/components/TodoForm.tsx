import { FC, useContext, useState } from 'react';
import { DispatchTodo } from '../context';
import { ActionTypes } from '../types';

type Props = {
  setErrorMessage: (value: string) => void;
};

export const TodoForm: FC<Props> = ({ setErrorMessage }) => {
  const [query, setQuery] = useState('');
  const dispatch = useContext(DispatchTodo);

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query.trim() === '') {
      setErrorMessage('You must enter a valid title');

      return;
    }

    dispatch({ type: ActionTypes.ADD_TODO, payload: query });
    setQuery('');
  };

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="search"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={query}
        onChange={handleQuery}
      />
    </form>
  );
};
