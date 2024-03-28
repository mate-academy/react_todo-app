import React, { useContext, useState } from 'react';
import { TodosContext } from './TodosContext';

export const AddNewTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const { addTodo } = useContext(TodosContext);
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    addTodo(title);

    setTitle('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={title}
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={e => setTitle(e.target.value)}
      />
    </form>
  );
};
