import React, { useState, useContext } from 'react';
import { TodosContext } from '../contexts/TodosContext';

type Props = {};

export const Header: React.FC<Props> = () => {
  const [title, setTitle] = useState('');
  const { todos, setTodos } = useContext(TodosContext);

  const correctTitle = title.trim();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleTodoAdding = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && correctTitle.length > 0) {
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
      <form>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleTitleChange}
          onKeyUp={handleTodoAdding}
        />
      </form>
    </header>
  );
};
