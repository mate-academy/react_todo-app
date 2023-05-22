/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { ModalOverlay } from './ModalOverlay';

type Props = {
  todoInfo: Todo,
  addComplitedTodo: (todoId:number) => void,
  onTodoDelete: (id: number) => void,
  onTodoChangingStatus: (todoId: number) => void,
  onTodoChangingTitle: (todoId: number, title:string) => void,
  todoLoadingId: number[],
};

export const TodoInfo: React.FC<Props> = ({
  todoInfo,
  addComplitedTodo,
  onTodoDelete,
  onTodoChangingStatus,
  onTodoChangingTitle,
  todoLoadingId,
}) => {
  const [isTodoEditing, setIsTodoEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todoInfo.title);

  const {
    id,
    title,
    completed,
  } = todoInfo;

  const handleInputChange = (
    { target }: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewTitle(target.value);
  };

  const handleInputBlur = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.value.trim() !== title) {
      setNewTitle(target.value.trim());
    }

    if (target.value.trim() === '') {
      onTodoDelete(id);
    }

    setIsTodoEditing(false);
    setNewTitle(target.value.trim());
  };

  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsTodoEditing(false);
      setNewTitle(title);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onTodoChangingTitle(id, newTitle);
    setIsTodoEditing(false);
  };

  const isTodoLoading = id === 0 || todoLoadingId.includes(id);

  return (
    <div className={`todo ${completed ? 'completed' : ''}`}>
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          data-cy="TodoStatus"
          checked={completed}
          onChange={() => {
            onTodoChangingStatus(id);
            addComplitedTodo(id);
          }}
        />
      </label>
      {isTodoEditing ? (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyUp={onKeyUp}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsTodoEditing(true)}
          >
            {newTitle}
          </span>
          <button
            type="button"
            className="todo__remove"
            onClick={() => onTodoDelete(id)}
          >
            ×

          </button>
        </>
      )}
      <ModalOverlay
        isTodoLoading={isTodoLoading}
      />

    </div>
  );
};
