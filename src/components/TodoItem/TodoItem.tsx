import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import './TodoItem.scss';
import { Todo } from '../../types/Todo';
import { ActionType } from '../../types/ActionType';
import { useTodos } from '../../providers/TodosProvider/hooks/useTodos';
import { Props } from './types/Props';

export const TodoItem: React.FC<Props> = ({ todo, active }) => {
  const { setTodos } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleSubmit = (editableTodo: Todo) => {
    setNewTitle(newTitle.trim());
    setIsEditing(false);
    setTodos({
      type: ActionType.ChangeName,
      payload: { id: editableTodo.id, title: newTitle },
    });
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    active.current?.focus();
  });

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() =>
            setTodos({ type: ActionType.ChangeStatus, payload: todo.id })
          }
        />
      </label>

      {!isEditing ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() =>
              setTodos({ type: ActionType.DeleteTodo, payload: todo.id })
            }
          >
            ×
          </button>
        </>
      ) : (
        <form
          onSubmit={() => handleSubmit(todo)}
          onBlur={() => handleSubmit(todo)}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={event => setNewTitle(event.target.value)}
            onKeyUp={handleKeyUp}
            ref={active}
          />
        </form>
      )}
    </div>
  );
};
