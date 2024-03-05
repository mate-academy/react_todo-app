import React, { useContext, useState, useRef, useEffect } from 'react';
import { TodosContext } from '../../context/TodosContext';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');
  const { dispatch } = useContext(TodosContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim() === '') {
      return;
    }

    dispatch({ type: 'add', payload: title });
    setTitle('');
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
