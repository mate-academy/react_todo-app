import React, { useState } from 'react';

import { Todo } from '../types/todo';

type Props = {
  onTodoAdd: (newTodo: Todo) => Promise<void>
};

const AddTodoForm: React.FC<Props> = ({ onTodoAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onTodoAdd({
      id: 0,
      title,
      userId: 2450,
      completed: false,
    });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
    </form>
  );
};

export default AddTodoForm;
