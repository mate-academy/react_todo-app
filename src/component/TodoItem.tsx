/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';

import { Todo } from '../types/Todo';
import { TodosContext } from './TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const todosContext = useContext(TodosContext);
  const {
    toggleTodo,
    deleteTodo,
    updateTodoTitle,
  } = todosContext;

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  function handleToogleTodo() {
    toggleTodo(todo.id);
  }

  function handleDeleteTodo() {
    deleteTodo(todo.id);
  }

  function handleNewTitle(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTitle(event.target.value);
  }

  function handleEditingSubmit() {
    if (newTitle.trim() !== '') {
      setNewTitle(newTitle.trim());
      setIsEditing(false);
      updateTodoTitle(todo.id, newTitle.trim());
    } else {
      deleteTodo(todo.id);
    }
  }

  function handleEditCancel() {
    setIsEditing(false);
    setNewTitle(todo.title);
  }

  function handleKeyUp(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      handleEditingSubmit();
    } else if (event.key === 'Escape') {
      handleEditCancel();
    }
  }

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <li
      className={cn({
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      {isEditing
        ? (
          <input
            type="text"
            ref={inputRef}
            placeholder="Empty title will delete this todo"
            className="edit"
            value={newTitle}
            onChange={handleNewTitle}
            onBlur={handleEditingSubmit}
            onKeyUp={handleKeyUp}
          />
        )
        : (
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              id={`toggle-${todo.id}`}
              checked={todo.completed}
              onChange={handleToogleTodo}
            />

            <label onDoubleClick={() => setIsEditing(true)}>
              {todo.title}
            </label>

            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              onClick={handleDeleteTodo}
            />
          </div>
        )}
    </li>
  );
};
