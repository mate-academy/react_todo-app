import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface TodoInfoProps {
  todo: Todo;
  deleteTodo: (id: number) => void;
  updateTodoCompleted: (id: number, completed: boolean) => void;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({
  todo,
  deleteTodo,
  updateTodoCompleted,
}) => {
  const { id, title, completed } = todo;
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);

  const handleDoubleClick = () => {
    setIsTitleEdit(true);
  };

  const handleUpdateTitle = () => {
    if (!updatedTitle.trim()) {
      deleteTodo(id);
    }

    if (updatedTitle === title) {
      setIsTitleEdit(false);

      return;
    }

    setIsTitleEdit(false);
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setUpdatedTitle(event.target.value);
  };

  const cancelEditing = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setUpdatedTitle(title);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleUpdateTitle();
    }
  };

  const handleCheckboxChange = () => {
    const updatedCompleted = !completed;

    updateTodoCompleted(id, updatedCompleted);
  };

  return (
    <div
      key={id}
      className={
        classNames('todo',
          { completed, editing: isTitleEdit })
      }
    >
      <div className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={handleCheckboxChange}
        />
      </div>
      {isTitleEdit ? (
        <input
          type="text"
          className="todo__title-field"
          value={updatedTitle}
          onChange={handleChangeTitle}
          onBlur={handleUpdateTitle}
          onKeyDown={cancelEditing}
          onKeyPress={handleKeyPress}
        />
      ) : (
        <div
          className="todo__title"
          onDoubleClick={handleDoubleClick}
        >
          {updatedTitle}
        </div>
      )}
      <button
        type="button"
        className="todo__remove"
        onClick={() => deleteTodo(id)}
      >
        ×
      </button>
    </div>
  );
};
