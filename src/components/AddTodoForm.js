import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todos';

export const AddTodoForm = () => {
  const [newTitle, setNewTitle] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();

    if (!newTitle) {
      return;
    }

    const action = addTodo(newTitle);

    dispatch(action);
    setNewTitle('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        value={newTitle}
        onChange={({ target }) => {
          setNewTitle(target.value);
        }}
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
};
