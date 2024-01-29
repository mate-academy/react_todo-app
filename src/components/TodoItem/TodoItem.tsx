/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../../context/TodoContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = React.memo(({ todo }) => {
  const { title, id, completed } = todo;
  const [newTitle, setNewTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const { deleteTodo, updateTodo } = useContext(TodoContext);
  const editInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && editInput.current) {
      editInput.current.focus();
    }
  }, [isEditing]);

  const handleDeleteTodo = () => {
    deleteTodo(id);
  };

  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateTodo({ ...todo, completed: event.target.checked });
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const editTodo = () => {
    if (!newTitle.trim()) {
      deleteTodo(id);
    }

    updateTodo({ ...todo, title: newTitle.trim() });
    setIsEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setNewTitle(title);
      setIsEditing(false);
    }

    if (event.key === 'Enter') {
      editTodo();
      setIsEditing(false);
    }
  };

  return (
    <li
      className={classNames({ completed, isEditing })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={handleChangeChecked}
        />

        <label onDoubleClick={handleDoubleClick}>
          {title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDeleteTodo}
        />
      </div>

      <input
        ref={editInput}
        type="text"
        className="edit"
        value={newTitle}
        onKeyUp={handleKeyUp}
        onChange={handleTitleChange}
        onBlur={editTodo}
      />
    </li>
  );
});
