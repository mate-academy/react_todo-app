import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { MethodsContext, TodosContext } from '../TodosContext/TodosContext';
import { countActiveTodo } from '../../utils/countActiveTodo';

export const Header: React.FC = () => {
  const { todos } = useContext(TodosContext);
  const { addTodo, toggleAll } = useContext(MethodsContext);

  const [newTitle, setNewTitle] = useState('');

  const titleInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleInput.current?.focus();
  }, [todos]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = newTitle.trim();

    if (trimmed) {
      addTodo(trimmed);
      setNewTitle('');
      titleInput.current?.focus();
    }
  }

  const activeTodoCount = useMemo(() => countActiveTodo(todos), [todos]);

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: activeTodoCount === 0,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={titleInput}
          value={newTitle}
          onChange={event => setNewTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
