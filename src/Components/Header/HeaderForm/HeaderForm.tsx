import React, { useContext, useState } from 'react';
import { TodosContext } from '../../../Context/TodosContext';

export const HeaderForm : React.FC = () => {
  const [message, setMessage] = useState('');

  const { handleTodo } = useContext(TodosContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event: React.FormEvent) => {
    event.preventDefault();

    if (message.trim()) {
      handleTodo(message);

      setMessage('');
    }
  };

  return (
    <form onSubmit={handleKeyDown}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        value={message}
        placeholder="What needs to be done?"
        onChange={handleChange}
      />
    </form>
  );
};
