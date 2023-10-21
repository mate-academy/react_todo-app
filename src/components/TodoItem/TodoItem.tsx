/* eslint-disable jsx-a11y/control-has-associated-label */

import { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useTodosDispatch } from '../TodosContext/TodosContext';
import { State } from '../../types/State';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useTodosDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const editInputRef = useRef<HTMLInputElement | null>(null);

  const handleDeleteButton = () => {
    dispatch({
      type: State.DELETED,
      id: todo.id,
    });
  };

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && editedTitle.trim() !== '') {
      dispatch({
        type: State.EDIT,
        task: { ...todo, title: editedTitle },
      });
      setIsEditing(false);
    } else if (e.key === 'Escape') {
      setEditedTitle(todo.title);
      setIsEditing(false);
    } else if (e.key === 'Enter' && editedTitle.trim() === '') {
      dispatch({
        type: State.DELETED,
        id: todo.id,
      });
    }
  };

  const handleEdit = () => {
    if (editedTitle.trim() === '') {
      dispatch({
        type: State.DELETED,
        id: todo.id,
      });
    } else {
      dispatch({
        type: State.EDIT,
        task: { ...todo, title: editedTitle },
      });
    }

    setIsEditing(false);
  };

  return (
    <li className={cn({ completed: todo.completed, editing: isEditing })}>
      <div className="view" onDoubleClick={handleDoubleClick}>
        <input
          type="checkbox"
          checked={todo.completed}
          className="toggle"
          onChange={() => {
            dispatch({
              type: State.EDIT,
              task: { ...todo, completed: !todo.completed },
            });
          }}
        />
        <label>{todo.title}</label>
        <button
          onClick={handleDeleteButton}
          type="button"
          className="destroy"
          data-cy="deleteTodo"
        />
      </div>
      <input
        ref={editInputRef}
        type="text"
        className="edit"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleEdit}
      />
    </li>
  );
};
