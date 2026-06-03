import React, { useState } from 'react';
import { useTodo } from '../../context/TodoContext';

export const NewTodo: React.FC = () => {
  const { addTodo, shouldFocusInput, setShouldFocusInput } = useTodo();
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newTodoTitle.trim()) {
      addTodo(newTodoTitle.trim());
      setNewTodoTitle('');
    }
  };

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  React.useEffect(() => {
    if (shouldFocusInput) {
      inputRef.current?.focus();
      setShouldFocusInput(false);
    }
  }, [shouldFocusInput, setShouldFocusInput]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        autoFocus
        value={newTodoTitle}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        onChange={event => setNewTodoTitle(event.target.value)}
      />
    </form>
  );
};
