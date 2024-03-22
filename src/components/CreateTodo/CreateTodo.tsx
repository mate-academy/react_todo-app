import React, { useContext, useState } from 'react';
import { TodosDispatchContext } from '../../contexts/TodosContext';

export const CreateTodo: React.FC = () => {
  const dispatch = useContext(TodosDispatchContext);
  const [title, setTitle] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (trimmedTitle) {
      dispatch({ type: 'create', payload: { title: trimmedTitle } });
      setTitle('');
    }
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
        onBlur={handleSubmit}
      />
    </form>
  );
};
