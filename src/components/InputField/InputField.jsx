import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

export const InputField = ({ addNewTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      title: inputValue,
      id: uuidv4(),
      completed: false,
      isBeingEdited: false,
    };

    if (newTodo.title.trim()) {
      addNewTodo(newTodo);
    }

    setInputValue('');
  };

  const onInput = (e) => {
    if (e.target.value.trim()) {
      setInputValue(e.target.value);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
    >
      <input
        type="text"
        value={inputValue}
        onChange={onInput}
        className="new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
};

InputField.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
};
