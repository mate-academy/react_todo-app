import React, { useEffect, useRef } from 'react';
import { useTodos } from '../context/TodoContext';

export const TodoHeader: React.FC = () => {
  const [title, setTitle] = React.useState('');
  const { todos, addTodo, toggleAll, setErrorMessage } = useTodos();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos.length]);

  const hasTodos = todos.length > 0;
  const areAllCompleted = hasTodos && todos.every(todo => todo.completed);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setErrorMessage('Title should not be empty');
      setTimeout(() => setErrorMessage(''), 3000);

      return;
    }

    addTodo(title.trim());
    setTitle('');
  };

  return (
    <header className="todoapp__header">
      {hasTodos ? (
        <button
          type="button"
          className={`todoapp__toggle-all ${areAllCompleted ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      ) : (
        <div className="todoapp__toggle-all" style={{ visibility: 'hidden' }} />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
          ref={inputRef}
        />
      </form>
    </header>
  );
};
