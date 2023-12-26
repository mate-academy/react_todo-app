import { useCallback, useContext, useState } from 'react';
import { DispatchContext } from '../GlobalContextProvider';
import { Todo } from '../../types/Todo';

export const Header = () => {
  const dispatch = useContext(DispatchContext);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    },
    [],
  );

  const handleAddTodo = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (inputValue.trim()) {
        const newTodo: Todo = {
          id: +new Date(),
          title: inputValue.trim(),
          completed: false,
        };

        dispatch({ type: 'addTodo', payload: newTodo });
        setInputValue('');
      }
    },
    [inputValue, dispatch],
  );

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={handleAddTodo}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};
