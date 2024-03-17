import React, { useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../type/Todo';
import { TodosContext } from './TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { dispatch } = useContext(TodosContext);
  const [editId, setEditId] = useState(0);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editId]);

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
      handleDestroy(editId);
      setEditId(0);

      return;
    }

    dispatch({
      type: 'update',
      playload: {
        ...todo,
        title: editedTitle,
      },
    });

    setEditId(0);
  };

  const handleEditing = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleUpdate();
    }

    if (event.key === 'Escape') {
      setEditId(0);
      setEditedTitle(todo.title);
    }
  };

  return (
    <li
      className={cn({
        editing: todo.id === editId,
        completed: todo.completed,
      })}
      onDoubleClick={() => setEditId(todo.id)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={handleStatus}
        />
        <label htmlFor="toggle-view">{todo.title}</label>
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
