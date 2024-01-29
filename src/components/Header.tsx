/* eslint-disable max-len */
import { useContext, useState } from 'react';
import { DispatchContext } from '../Store';
import { ActionType } from '../utils/enums';

export const Header = () => {
  const [inputValue, setInputValue] = useState('');

  const dispatch = useContext(DispatchContext);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputValue === '') {
      return;
    }

    if (event.key === 'Enter' && inputValue.trim() !== '') {
      event.preventDefault();
      dispatch({
        type: ActionType.Add,
        payload: { id: +new Date(), title: inputValue, completed: false },
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
