import React, { useContext, useState } from 'react';
import { TodoContext } from '../../context/TodoContext';

export const NewTodo: React.FC = () => {
  const todoContext = useContext(TodoContext);

  if (!todoContext) {
    throw new Error('TodoContext must be used within a TodoProvider');
  }

  const { addTodo } = todoContext;
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (newTodoTitle.trim()) {
      addTodo(newTodoTitle.trim());
      setNewTodoTitle('');
    }
  };

  const inputRef = React.useRef<HTMLInputElement>(null);
  const { shouldFocusInput, setShouldFocusInput } = todoContext;

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
