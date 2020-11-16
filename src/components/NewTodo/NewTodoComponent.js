import React, { useState } from 'react';

export const NewTodoComponent = () => {
  const [title, setTitle] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;

    setTitle(value);
  };

  return (
    <form>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={handleChange}
      />
    </form>
  );
};
