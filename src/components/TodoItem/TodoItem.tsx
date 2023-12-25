/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  ChangeEvent, KeyboardEvent,
  useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../libs/types';
import { ItemClassName, KeysEvent } from '../../libs/enums';

type Props = {
  item: Todo;
  onRemove: (todoId: number) => void;
  onEdit: (editedTodo: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({ item, onRemove, onEdit }) => {
  const { id, title, completed } = item;
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(title);

  const editingInputRef = useRef<HTMLInputElement | null>(null);

  const handleRemove = () => {
    onRemove(id);
  };

  const handleCompletedToggle = () => {
    onEdit({ ...item, completed: !completed });
  };

  const handleShowEditInput = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    if (isEditing && editingInputRef.current) {
      editingInputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditingTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setEditingTitle(event.target.value);
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingTitle(title);
  };

  const saveEditing = () => {
    setIsEditing(false);

    if (!editingTitle.trim()) {
      onRemove(id);

      return;
    }

    onEdit({ ...item, title: editingTitle });
  };

  const handleEditInputLoseFocus = () => {
    saveEditing();
  };

  const handleSaveEditedTitle = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KeysEvent.escape) {
      resetEditing();
    }

    if (event.key === KeysEvent.enter) {
      saveEditing();
    }
  };

  return (
    <li className={classNames({
      [ItemClassName.view]: !completed && !isEditing,
      [ItemClassName.completed]: completed && !isEditing,
      [ItemClassName.editing]: isEditing,
    })}
    >
      <div className="view">
        {isEditing}
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={handleCompletedToggle}
        />

        <label
          onDoubleClick={handleShowEditInput}
        >
          {title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleRemove}
        />
      </div>

      <input
        type="text"
        className="edit"
        ref={editingInputRef}
        value={editingTitle}
        onChange={handleEditingTitle}
        onBlur={handleEditInputLoseFocus}
        onKeyUp={handleSaveEditedTitle}
      />
    </li>
  );
};
