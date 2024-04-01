import React, { useRef, useState } from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { useTodos } from '../../store/Store';

type Props = {
  todo: Todo;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const { deleteTodo, toggleTodo, updateTitleTodo } = useTodos();
  const { title, id, completed } = todo;

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDoubleClick = () => setIsEditing(!isEditing);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEditedTitle(event.target.value);

  const handleChanges = () => {
    if (editedTitle.trim() === '') {
      deleteTodo(id);
    } else {
      updateTitleTodo(editedTitle, id);
      setIsEditing(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleChanges();
    } else if (event.key === 'Escape') {
      setIsEditing(false);
      setEditedTitle(title);
    }
  };

  return (
    <li className={cn({ completed: completed, editing: isEditing })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view-${id}`}
          checked={completed}
          onChange={() => toggleTodo(id)}
        />

        <label onDoubleClick={handleDoubleClick}>{title}</label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(id)}
        />
      </div>

      <input
        type="text"
        className="edit"
        value={editedTitle}
        onChange={handleChangeTitle}
        onBlur={handleChanges}
        onKeyUp={handleKeyPress}
        ref={inputRef}
      />
    </li>
  );
};

export default TodoItem;
