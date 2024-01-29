import React, { useContext, useState } from 'react';
import { DispatchContext } from '../../Store';

export const TodoApp = () => {
  const dispatch = useContext(DispatchContext);
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!inputText.trim()) {
      return;
    }

    dispatch({
      type: 'addTodo',
      payload: {
        id: +new Date(),
        title: inputText,
        completed: false,
      },
    });
    setInputText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={inputText}
        onChange={handleInputChange}
      />
    </form>
  );
};
