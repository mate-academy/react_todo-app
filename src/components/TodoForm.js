import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todos';

export const TodoForm = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addTodo(inputValue.trim()));
    setInputValue('');
  };

  return (
    <form onSubmit={event => handleSubmit(event)}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
      />
    </form>
  );
};
