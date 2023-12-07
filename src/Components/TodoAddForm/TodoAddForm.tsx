import React, { useState, useContext } from 'react';
import { TodoContext } from '../../contexts/TodoContext';

export const TodoAddForm: React.FC = () => {
  const [inputTitle, setInputTitle] = useState('');

  const { dispatch } = useContext(TodoContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputTitle.trim().length > 0) {
      dispatch({ type: 'addTodo', title: inputTitle });

      setInputTitle('');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={inputTitle}
        onChange={handleInputChange}
      />
    </form>
  );
};
