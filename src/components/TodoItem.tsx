import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';
import { DispatchContext } from '../context/TodosContext';
import { Todo } from '../types/Todo';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  todo: Todo
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, completed, id } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const dispatch = useContext(DispatchContext);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleCompleted = () => {
    dispatch({ type: 'complete', payload: id });
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    dispatch({ type: 'delete', payload: id });
  };

  const saveNewTitle = () => {
    if (newTitle.trim()) {
      dispatch({
        type: 'edit',
        payload: { id: todo.id, title: newTitle, completed },
      });

      setIsEditing(false);
    } else {
      handleDelete();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setNewTitle(title);

      setIsEditing(false);
    } else if (e.key === 'Enter') {
      saveNewTitle();
    }
  };

  const handleBlur = () => {
    saveNewTitle();
  };

  return (
    <li className={cn({
      completed,
      editing: isEditing,
    })}
    >
      <div
        className="view"
        onDoubleClick={handleDoubleClick}
      >
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={handleCompleted}
        />
        <label>{title}</label>
        <button
          onClick={handleDelete}
          type="button"
          className="destroy"
          data-cy="deleteTodo"
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitle}
        onChange={(event) => setNewTitle(event.target.value)}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
        ref={inputRef}
      />
    </li>
  );
};
