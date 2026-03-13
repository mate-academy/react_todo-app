import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { TodoContext } from '../../context/TodoContext';

export const Header: React.FC = () => {
  const contex = useContext(TodoContext);
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [contex?.todos]);

  if (!contex) {
    return null;
  }

  const { todos, addTodo, toggleAll } = contex;
  const checkedAll = todos.every(todo => todo.completed);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    addTodo(title.trim());
    setTitle('');
  }

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${checkedAll ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={() => toggleAll(checkedAll)}
        />
      )}

      {/* Add a todo on form submit */}
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
