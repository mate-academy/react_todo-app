/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useState } from 'react';

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
        className={classNames({
          completed: item.completed,
          editing: isEditing,
        })}
        onDoubleClick={() => setIsEditing(true)}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id="toggle-view"
            checked={item.completed}
            onChange={() => setTodoStatus(item.id)}
          />
          <label htmlFor="toggle-view">{item.title}</label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => removeTodo(item.id)}
          />
        </div>

        {isEditing && (
          <input
            type="text"
            className="edit"
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
