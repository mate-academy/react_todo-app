import React, { useState, useEffect } from 'react';

export const TodoApp = ({ currentListToDo, setCurrentListToDo }) => {
  const [inputValue, setInputValue] = useState('');

  const hendlerForm = () => {
    const objNewTodo = {
      title: inputValue,
      id: +new Date(),
      isCompleated: false,
    };

    setInputValue('');

    setCurrentListToDo([...currentListToDo, objNewTodo]);
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();

        hendlerForm();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [inputValue]);

  return (
    <>
      <form data-cy="createTodo" onSubmit={hendlerForm}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
      </form>
    </>
  );
};
