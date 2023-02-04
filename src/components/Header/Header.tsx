import classNames from 'classnames';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useRef } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todosFromServer: Todo[],
  newTodoTitle: string,
  setNewTodoTitle: (title: string) => void,
  createTodo: (e: React.FormEvent<HTMLFormElement>) => void,
  toggleAllTodos: () => void,
  setAppliedNewTodoTitle: (title: string) => void,
  activeTodosCount: number,
  isAdding: boolean,
};

export const Header: React.FC<Props> = ({
  todosFromServer,
  newTodoTitle,
  setNewTodoTitle,
  createTodo,
  toggleAllTodos,
  setAppliedNewTodoTitle,
  activeTodosCount,
  isAdding,
}) => {
  const newTodoField = useRef<HTMLInputElement>(null);

  const applyNewTodoTitle = useCallback(
    debounce(setAppliedNewTodoTitle, 1000),
    [],
  );

  const handleChangeNewTodoField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(e.target.value);
    applyNewTodoTitle(e.target.value);
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, [todosFromServer]);

  return (
    <header className="todoapp__header">
      <button
        data-cy="ToggleAllButton"
        type="button"
        aria-label="Toggle all button"
        className={classNames(
          'todoapp__toggle-all',
          { active: activeTodosCount === 0 },
          { hidden: todosFromServer.length === 0 },
        )}
        onClick={toggleAllTodos}
      />

      <form onSubmit={createTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          disabled={isAdding}
          onChange={handleChangeNewTodoField}
        />
      </form>
    </header>
  );
};
