import React, { useContext, useState } from 'react';
import { DispatchContext } from './Store';
import { ActionType } from '../Type/Type';

export const Form : React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useContext(DispatchContext);

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      dispatch({
        type: ActionType.add,
        payload: inputValue.trim(),
      });

      setInputValue('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleAddTodo();
        }}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
