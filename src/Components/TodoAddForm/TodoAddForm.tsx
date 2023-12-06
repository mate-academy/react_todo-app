import React, { useState } from 'react';

interface TodoAddFormProps {
  handleAddTodo: (title: string) => void;
}

export const TodoAddForm: React.FC<TodoAddFormProps> = ({
  handleAddTodo,
}) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.length > 0) {
      handleAddTodo(title);

      setTitle('');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={handleInputChange}
      />
    </form>
  );
};
