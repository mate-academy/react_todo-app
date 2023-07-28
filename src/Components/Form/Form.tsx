import React, { useState } from 'react';
import { useLocalStorage } from '../../hooks/UseLocalStorege';

import { Todo } from '../../Types/Todo';

export const Form = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const resetForm = () => {
    setTitle('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newDateId = +new Date();

    const todo = {
      completed: false,
      id: newDateId,
      titleStorege: title,
    };

    if (!title.trim()) {
      return;
    }

    setTodos([...todos, todo]);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
    </form>
  );
};
