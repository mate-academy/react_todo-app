/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  item: Todo;
  setTodoStatus:(id: number) => void;
  removeTodo: (id: number) => void;
  changeTodoTitle: (id: number, newTitle: string) => void;
};

export const TodoItem: React.FC<Props> = React.memo(
  ({
    item,
    setTodoStatus,
    removeTodo,
    changeTodoTitle,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState('');

    return (
      <li
        key={item.id}
        className={classNames('todo', {
          completed: item.completed,
          editing: isEditing,
        })}
        onDoubleClick={() => setIsEditing(true)}
      >
        <label className="todo__status-label">
          <input
            type="checkbox"
            className="todo__status"
            checked={item.completed}
            onChange={() => setTodoStatus(item.id)}
          />
        </label>
        {!isEditing
          ? (
            <>
              <span className="todo__title">{item.title}</span>
              <button
                type="button"
                className="todo__remove"
                data-cy="deleteTodo"
                onClick={() => removeTodo(item.id)}
              >
                x
              </button>
            </>
          )
          : (
            <input
              type="text"
              className="todo__title-field"
              value={newTitle}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              onChange={event => setNewTitle(event.target.value)}
              onBlur={() => {
                if (newTitle) {
                  changeTodoTitle(item.id, newTitle);
                }

                setNewTitle('');
                setIsEditing(false);
              }}
              onKeyDown={(event) => {
                if (event.code === 'Enter' && newTitle) {
                  changeTodoTitle(item.id, newTitle);
                  setNewTitle('');
                  setIsEditing(false);
                }

                if (event.code === 'Escape') {
                  setNewTitle('');
                  setIsEditing(false);
                }
              }}
            />
          )}

      </li>
    );
  },
);
