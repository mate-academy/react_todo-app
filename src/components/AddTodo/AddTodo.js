import React, { useState } from 'react';
import { createTodo } from '../../api/api';

import { AddTodoTypes } from './AddTodoTypes';

export const AddTodo = ({
  onAddTodo,
  setError,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddTodo(inputValue);
    }
  };

  const handleAddTodo = (value) => {
    if (value) {
      createTodo({
        title: value,
        completed: false,
      })
        .then((newTodo) => {
          onAddTodo(prevTodo => [
            ...prevTodo,
            newTodo,
          ]);
        })
        .catch(error => setError(error.toString()));
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
        onBlur={event => handleAddTodo(event.target.value)}
      />
    </form>
  );
};

AddTodo.propTypes = AddTodoTypes;
