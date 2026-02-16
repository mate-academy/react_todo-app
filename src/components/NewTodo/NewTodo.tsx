import React, { useContext, useState } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { useAutoFocus } from '../../hooks/useAutoFocus';

export const NewTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const { onAddTodo } = useContext(TodoContext);
  const newTodoRef = useAutoFocus();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      return;
    }

    onAddTodo(normalizedTitle);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        style={{ boxSizing: 'border-box' }}
        value={title}
        onChange={event => setTitle(event.target.value)}
        ref={newTodoRef}
        autoFocus
      />
    </form>
  );
};
