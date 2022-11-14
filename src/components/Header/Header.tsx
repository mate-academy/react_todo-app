import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  newTodoField: React.RefObject<HTMLInputElement>;
  todos: Todo[];
  toNameTodo: (title: string) => void;
  isAdding: boolean;
  toggleAll: () => void;
};

export const Header: React.FC<Props> = (
  {
    newTodoField,
    todos,
    toNameTodo,
    isAdding,
    toggleAll,
  },
) => {
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const createTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    toNameTodo(newTodoTitle);
    setNewTodoTitle('');
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          data-cy="ToggleAllButton"
          type="button"
          className={classNames(
            'todoapp__toggle-all',
            {
              active: todos.every(todo => todo.completed),
            },
          )}
          aria-label="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={createTodoTitle}
          value={newTodoTitle}
          disabled={isAdding}
        />
      </form>
    </header>
  );
};
