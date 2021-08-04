import React, { useState } from 'react';
import { addNewTodo } from '../api/api';

export const NewTodoForm = ({ setTodos }) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const handleChange = ({ target }) => {
    setNewTodoTitle(target.value);
  };

  const newTodo = async(e) => {
    e.preventDefault();

    if (!newTodoTitle.trim()) {
      return;
    }

    const newTodoObj = {
      "userId": 1233,
      "completed": false,
      "title": newTodoTitle,
    };

    setNewTodoTitle('');
    await addNewTodo(newTodoObj)
      .then((response) => {
        if (response.ok) {
          setTodos(list => [...list, {
            ...newTodoObj,
            id: new Date(),
          }]);
        }
      });
  };

  return (
    <form onSubmit={newTodo}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTodoTitle}
        onChange={handleChange}
      />
    </form>
  );
};
