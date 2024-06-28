import React, { useState } from 'react';

type Props = {
  addTodo: (title: string) => void,
};

export const AddTodoForm: React.FC<Props> = ({ addTodo }) => {
  const [newTitle, setNewTitle] = useState('');

  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        if (!newTitle) {
          return;
        }

        addTodo(newTitle);
        setNewTitle('');
      }}
    >
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTitle}
        onChange={event => {
          setNewTitle(event.target.value);
        }}
      />
    </form>
  );
};
