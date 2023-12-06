/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/interfaces';

interface TodoItemProps {
  todo: Todo;
  destroyTodo: (todoId: number) => void;
  toggleTodoStatus: (todoId: number) => void;
  handleEditTodo: (id: number, newTitle: string) => void;
  isEditing: boolean;
  onDoubleClick: () => void;
  onCancelEditing: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  destroyTodo,
  toggleTodoStatus,
  handleEditTodo,
  isEditing,
  onDoubleClick,
  onCancelEditing,
}) => {
  const [inputValue, setInputValue] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const submitChanges = () => {
    if (inputValue.length === 0) {
      destroyTodo(todo.id);
    } else {
      handleEditTodo(todo.id, inputValue);
    }

    onCancelEditing();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      submitChanges();
    }
  };

  const handleEscChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      // Save the original value before editing when Escape key is pressed
      setInputValue(todo.title);
      submitChanges();
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onClick={() => toggleTodoStatus(todo.id)}
        />
        <label onDoubleClick={onDoubleClick}>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => destroyTodo(todo.id)}
        />
      </div>
      <input
        id={todo.title}
        type="text"
        className="edit"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        ref={inputRef}
        onBlur={submitChanges}
        onKeyUp={handleEscChange}
      />
    </li>
  );
};
