/* eslint-disable max-len */
import { useContext, useState } from 'react';
import { DispatchContext } from '../Store';

export const Header = () => {
  const [inputValue, setInputValue] = useState('');

  const dispatch = useContext(DispatchContext);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputValue === '') {
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      dispatch({
        type: 'add',
        payload: { title: inputValue, id: +new Date(), completed: false },
      });

      setInputValue('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </form>
    </header>
  );
};
