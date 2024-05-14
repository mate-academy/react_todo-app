import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodoMethod, TodosContext } from '../../context/ToDosContext';
import cn from 'classnames';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');

  const { todos } = useContext(TodosContext);
  const methods = useContext(TodoMethod);

  const field = useRef<HTMLInputElement>(null);
  const activeTodos = todos.filter(todo => !todo.completed);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (trimmedTitle) {
      methods.addTodo(trimmedTitle);
      setTitle('');
      field.current?.focus();
    }
  };

  useEffect(() => {
    field.current?.focus();
  }, [todos]);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: activeTodos.length === 0,
          })}
          data-cy="ToggleAllButton"
          onClick={methods.toggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={field}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
