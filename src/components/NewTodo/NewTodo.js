import React, { useState } from 'react';
import { createTodo } from '../../api/api';

import { NewTodoTypes } from './NewTodoTypes';

export const NewTodo = ({
  onNewTodoAdd,
  onErrorSet,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (event) => {
    const { key } = event;

    if (key === 'Enter') {
      event.preventDefault();
      handleNewTodoAdd(inputValue);
    }
  };

  const handleNewTodoAdd = (value) => {
    if (value) {
      createTodo({
        title: value,
        completed: false,
      })
        .then((newTodo) => {
          onNewTodoAdd(prevTodo => [
            ...prevTodo,
            newTodo,
          ]);
        })
        .catch(error => onErrorSet(error.toString()));
      setInputValue('');
    }
  };

  return (
    <form>
      <input
        type="text"
        className="new-todo"
        value={inputValue}
        placeholder="What needs to be done?"
        onChange={event => setInputValue(event.target.value)}
        onKeyPress={handleKeyPress}
        onBlur={event => handleNewTodoAdd(event.target.value)}
      />
    </form>
  );
};

NewTodo.propTypes = NewTodoTypes;
