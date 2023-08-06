import React, { useContext, useState } from 'react';
import { TodosContext } from '../../context/TodosContext';

export const AddTodoForm: React.FC = () => {
  const [title, setTitle] = useState('');

  const { addTodo } = useContext(TodosContext);

  const reset = () => setTitle('');

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      return;
    }

    addTodo(normalizedTitle);
    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={onChangeInput}
      />
    </form>
  );
};
