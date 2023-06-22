import React, { useState } from 'react';
import classNames from 'classnames';

import { Todo } from 'types/Todo';
import { PatchTodo } from 'types/PatchTodo';
import { NewTodo } from '../NewTodo';

type Props = {
  todo: Todo;
  loadingTodo: number[];
  changeTodo: (id: number, data: PatchTodo) => void;
  removeTodo: (id: number) => void;
};

export const TodoItem: React.FC<Props> = React.memo(({
  todo,
  loadingTodo,
  changeTodo,
  removeTodo,
}) => {
  const [isNeedChange, setIsNeedChange] = useState(false);

  const { completed, title, id } = todo;
  const isLoading = loadingTodo.includes(id);

  const handleDoubleClick = () => {
    setIsNeedChange(true);
  };

  const handleChange = () => {
    changeTodo(id, { completed: !completed });
  };

  const handleRemove = () => {
    removeTodo(id);
  };

  return (
    <li className={classNames('todo', { completed })}>
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={handleChange}
        />
      </label>

      {isNeedChange ? (
        <NewTodo
          onNeedChange={setIsNeedChange}
          todo={todo}
          changeTodo={changeTodo}
          removeTodo={removeTodo}
        />
      ) : (
        <>
          <span
            className="todo__title"
            onDoubleClick={handleDoubleClick}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="deleteTodo"
            onClick={handleRemove}
          >
            ×
          </button>
        </>
      )}

      <div
        className={classNames(
          'modal overlay',
          { 'is-active': isLoading },
        )}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </li>
  );
});
