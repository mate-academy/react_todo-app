import React, { useState } from 'react';
import { useAppContext } from '../context/Context';

export const Header: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const { dispatch } = useAppContext();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputText.trim().length) {
      dispatch({
        type: 'addTodo',
        payload: {
          id: +new Date(),
          title: inputText.trim(),
          completed: false,
        },
      });
    }
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
      </form>
    </header>
  );
};
