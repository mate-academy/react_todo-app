import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  addTodo: (title: string) => void,
  isDisabled: boolean,
  activeTodosCount: number,
  onToggleAll: () => void;
};

export const Header: React.FC<Props> = ({
  todos,
  addTodo,
  isDisabled,
  activeTodosCount,
  onToggleAll,
}) => {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addTodo(newTodo);
    setNewTodo('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames(
            'todoapp__toggle-all',
            { active: !activeTodosCount },
          )}
          aria-label="ALL"
          onClick={onToggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          disabled={isDisabled}
          value={newTodo}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};
