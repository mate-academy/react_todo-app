/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ChangeEvent, useEffect, useState } from 'react';
import classnames from 'classnames';
import { Todo } from '../../types/Todo';

type TodoItemProps = {
  todo: Todo;
  onButtonClick: (todoId: number) => void;
  onTodoUpdate: (todo: Todo, value: object) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onButtonClick,
  onTodoUpdate,
}) => {
  const { title, completed, id } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleTodoDestroy = () => {
    onButtonClick(id);
  };

  const handleUpdateTodoTitle = () => {
    if (editedTitle) {
      onTodoUpdate(todo, { title: editedTitle });
    } else {
      handleTodoDestroy();
    }

    setIsEditing(false);
  };

  const handleTodoEdit = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUpdateTodoTitle();
    }

    if (e.key === 'Escape') {
      setEditedTitle(title);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      document.addEventListener('keyup', handleTodoEdit);
    } else {
      document.removeEventListener('keyup', handleTodoEdit);
    }
  }, [isEditing]);

  const handleTodoToggle = () => {
    onTodoUpdate(todo, { completed: !completed });
  };

  const handleEditingFormOpen = () => {
    setIsEditing(true);
  };

  const handleEditingTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const isCompleted = completed && !isEditing;

  return (
    <li
      className={classnames({
        completed: isCompleted,
      }, {
        editing: isEditing,
      })}
    >
      <div
        className="view"
        onDoubleClick={handleEditingFormOpen}
      >
        <input
          onChange={handleTodoToggle}
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
        />
        <label>
          {editedTitle}
        </label>
        <button
          onClick={handleTodoDestroy}
          type="button"
          className="destroy"
          data-cy="deleteTodo"
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editedTitle}
        onBlur={handleUpdateTodoTitle}
        onChange={handleEditingTitleChange}
      />
    </li>
  );
};
