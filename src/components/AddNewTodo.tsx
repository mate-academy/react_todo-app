import React, { useContext, useState } from 'react';
import { TodosContext } from './TodosContext';

export const AddNewTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const { addTodo } = useContext(TodosContext);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title) {
      return;
    }

    addTodo(title);
    setTitle('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
};
