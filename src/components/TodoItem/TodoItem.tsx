/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { TodosDispatchContext } from '../../contexts/TodosContext';
import { Todo } from '../../types';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { completed, title, id } = todo;
  const dispatch = useContext(TodosDispatchContext);
  const [editingField, setEditingField] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleUpdate = () => {
    const trimedTitle = editingField.trim();

    if (!trimedTitle.length) {
      dispatch({ type: 'remove', payload: { id } });

      return;
    }

    setIsEditing(false);
    setEditingField(trimedTitle);

    if (title !== trimedTitle) {
      dispatch({
        type: 'edit',
        payload: { id, title: trimedTitle },
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Enter': {
        ref.current?.blur();
        break;
      }

      case 'Escape': {
        setEditingField(title);
        setIsEditing(false);
        break;
      }

      default:
        break;
    }
  };

  useEffect(() => {
    if (isEditing) {
      ref.current?.focus();
    }
  }, [isEditing]);

  return (
    <li
      className={classNames({
        editing: isEditing,
        completed: completed && !isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={() =>
            dispatch({ type: 'toggleCompleted', payload: { id } })
          }
        />
        <label
          onDoubleClick={() => {
            setIsEditing(true);
          }}
        >
          {title}
        </label>
        <button
          type="button"
          onClick={() => dispatch({ type: 'remove', payload: { id } })}
          className="destroy"
          data-cy="deleteTodo"
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={ref}
        value={editingField}
        onChange={event => setEditingField(event.target.value)}
        onBlur={() => handleUpdate()}
        onKeyDown={handleKeyDown}
      />
    </li>
  );
};
