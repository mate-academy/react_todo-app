import React, { useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../type/Todo';
import { TodosContext } from './TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { dispatch } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleStatus = () => {
    dispatch({
      type: 'update',
      playload: {
        ...todo,
        completed: !todo.completed,
      },
    });
  };

  const handleDestroy = (todoId: number) => {
    dispatch({
      type: 'delete',
      playload: {
        id: todoId,
      },
    });
  };

  const handleUpdate = () => {
    const isEmpty = !editedTitle.trim();

    if (isEmpty) {
      handleDestroy(todo.id);
      setIsEditing(false);

      return;
    }

    dispatch({
      type: 'update',
      playload: {
        ...todo,
        title: editedTitle,
      },
    });

    setIsEditing(false);
  };

  const handleEditing = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleUpdate();
    }

    if (event.key === 'Escape') {
      setIsEditing(false);
      setEditedTitle(todo.title);
    }
  };

  return (
    <li
      className={cn({
        editing: isEditing,
        completed: todo.completed,
      })}
      onDoubleClick={() => setIsEditing(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={handleStatus}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="delete"
          onClick={() => handleDestroy(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={editInputRef}
        value={editedTitle}
        onChange={event => setEditedTitle(event.target.value)}
        onKeyUp={handleEditing}
        onBlur={handleUpdate}
      />
    </li>
  );
};
