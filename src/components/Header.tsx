import React, { useContext, useEffect, useRef } from 'react';
import { TodoContext } from './TodoContext';

export const Header: React.FC = () => {
  const { title, setTitle, addTodo } = useContext(TodoContext);
  const fieldTitle = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (fieldTitle.current) {
      fieldTitle.current.focus();
    }
  }, [fieldTitle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    const trimTitle = title.trim();
    const notComplete = false;

    const newTodo = {
      id: +new Date(),
      title: trimTitle,
      completed: notComplete,
    };

    addTodo(newTodo);
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          ref={fieldTitle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSubmit}
        />
      </form>
    </header>
  );
};
