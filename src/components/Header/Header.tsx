import React, { useState, useContext } from 'react';
import { TodosContext } from '../../contexts/TodosContext';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');
  const { todos, setTodos } = useContext(TodosContext);

  const correctTitle = title.trim();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (correctTitle.length > 0) {
      setTodos([
        ...todos,
        {
          id: +new Date(),
          title,
          completed: false,
        }]);

      setTitle('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleTitleChange}
        />
      </form>
    </header>
  );
};
