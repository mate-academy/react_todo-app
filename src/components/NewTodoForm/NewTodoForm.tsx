import React, { useState } from 'react';

const NewTodoForm: React.FC<NewTodoFormProps> = ({ handleSubmit }) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const createTodo = (event: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(event, newTodoTitle);
    setNewTodoTitle('');
  };

  return (
    <form
      onSubmit={createTodo}
    >
      <input
        value={newTodoTitle}
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={(event) => setNewTodoTitle(event.target.value)}
      />
    </form>
  );
};

export default NewTodoForm;
