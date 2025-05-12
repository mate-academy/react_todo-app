import React from 'react';
import { ToDoForm } from './ToDoForm';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

type Props = {
  addToDo: (todo: Todo) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  todos: Todo[];
  toggleAll: () => void;
};

export const Header: React.FC<Props> = ({
  addToDo,
  inputRef,
  todos,
  toggleAll,
}) => {
  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.length > 0 && todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      <ToDoForm
        onSubmit={addToDo}
        inputRef={inputRef}
      />
    </header>
  );
};
