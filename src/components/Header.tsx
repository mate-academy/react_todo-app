import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodosContext } from '../context/TodosContext';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { todos, visibleTodos, dispatch } = useContext(TodosContext);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimedTitle = title.trim();

    if (trimedTitle.length > 0) {
      dispatch({ type: 'add', payload: title.trim() });
      setTitle('');
    } else {
      setTitle('');

      return;
    }
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: !visibleTodos.some(todo => !todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={() => dispatch({ type: 'toggleAll' })}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
