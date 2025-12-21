import React, { useRef, useState, useEffect } from 'react';
import { useTodos } from '../../context/TodoContext';

export interface NewTodoHandle {
  focus: () => void;
}

export const NewTodo: React.FC = () => {
  const { addTodo, todos } = useTodos();
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const newTodoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    newTodoRef.current?.focus();
  }, [todos.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const title = newTodoTitle.trim();

    if (title) {
      addTodo(title);
      setNewTodoTitle('');
    }

    newTodoRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={newTodoTitle}
        onChange={e => setNewTodoTitle(e.target.value)}
        ref={newTodoRef}
      />
    </form>
  );
};
