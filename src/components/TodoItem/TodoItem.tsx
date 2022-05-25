/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useRef } from 'react';
import classNames from 'classnames';

const TodoItem: React.FC<TodoItemProps> = ({
  todo, index, editTodoTitle, editCompletedStatus,
}) => {
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [editedTodoTitle, setEditedTodoTitle] = useState(todo.title);
  const [
    initialEditingValue,
    setInitialEditingValue,
  ] = useState(editedTodoTitle);
  const editingInput = useRef<HTMLInputElement>(null);

  const liClasses = classNames({
    completed: todo.completed && !isEditingMode,
    editing: isEditingMode,
  });

  const checkboxIds = classNames({
    [`toggle-view${index}`]: !todo.completed && !isEditingMode,
    'toggle-completed': todo.completed && !isEditingMode,
    'toggle-editing': isEditingMode,
  });

  const editTodoValue = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEditingMode(false);
      setEditedTodoTitle(todo.title);

      return;
    }

    if (event.key === 'Enter') {
      if (initialEditingValue !== editedTodoTitle) {
        setInitialEditingValue(editedTodoTitle);
        editTodoTitle(editedTodoTitle, todo.id);
      }

      setIsEditingMode(false);
    }
  };

  const handleTodoDoubleClick = () => {
    setIsEditingMode(true);
    setInitialEditingValue(editedTodoTitle);
    setTimeout(() => {
      editingInput.current?.focus();
    }, 0);
  };

  const handleOnBlur = () => {
    if (initialEditingValue !== editedTodoTitle) {
      editTodoTitle(editedTodoTitle, todo.id);
    }

    setIsEditingMode(false);
  };

  return (
    <li className={liClasses}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={checkboxIds}
          onChange={() => editCompletedStatus(!todo.completed, todo.id)}
          checked={todo.completed}
        />
        <label
          htmlFor={checkboxIds}
          onClick={(event) => event.preventDefault()}
          onDoubleClick={handleTodoDoubleClick}
        >
          {todo.title}
        </label>
        <button
          type="button"
          data-cy="deleteTodo"
          className="destroy"
          onClick={() => editTodoTitle('', todo.id)}
        />
      </div>
      <input
        value={editedTodoTitle}
        ref={editingInput}
        type="text"
        className="edit"
        onChange={(event) => setEditedTodoTitle(event.target.value)}
        onKeyDown={(event) => editTodoValue(event)}
        onBlur={handleOnBlur}
      />
    </li>
  );
};

export default TodoItem;
