import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { TodoContext } from '../Context/TodoContext';

export const Header = () => {
  const context = useContext(TodoContext);
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const todos = context?.state.todos ?? [];

  const areAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos.length]);

  if (!context) {
    return null;
  }

  const { dispatch } = context;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    dispatch({ type: 'add', payload: trimmedTitle });
    setTitle('');
  };

  return (
    <header className="todoapp__header header">
      {todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${areAllCompleted ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={() => dispatch({ type: 'toggleAll' })}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          data-cy="NewTodoField"
          value={title}
          onChange={event => setTitle(event.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
