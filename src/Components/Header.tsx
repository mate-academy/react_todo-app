import React, { useContext, useEffect, useState } from 'react';
import { TodosContext } from './TodosContext';
import cn from 'classnames';

interface Props {
  input: React.RefObject<HTMLInputElement>;
}

export const Header: React.FC<Props> = ({ input }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [title, setTitle] = useState('');
  const areAllTodosCompleted = todos.every(todo => todo.completed);

  useEffect(() => {
    input.current?.focus();
  }, [input]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    setTodos([
      ...todos,
      { title: title.trim(), id: +new Date(), completed: false },
    ]);

    setTitle('');
    input.current?.focus();
  };

  const handleToggleAll = () => {
    setTodos(
      todos.map(todo => ({ ...todo, completed: !areAllTodosCompleted })),
    );

    input.current?.focus();
  };

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: areAllTodosCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          ref={input}
        />
      </form>
    </header>
  );
};
