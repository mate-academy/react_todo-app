import React, { useEffect, useRef, useState } from 'react';

type Props = {
  createNewTodo: (title: string) => void;
};

export const HeaderForm: React.FC<Props> = ({
  createNewTodo,
}) => {
  const [title, setTitle] = useState('');
  const todoInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (todoInput.current) {
      todoInput.current.focus();
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createNewTodo(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        ref={todoInput}
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
    </form>
  );
};
