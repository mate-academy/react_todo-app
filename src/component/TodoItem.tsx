/* eslint-disable jsx-a11y/control-has-associated-label */

import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { Todo } from '../types/todoTypes';
import { TodosContext } from './TodosContext';

interface Props {
  todo: Todo
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    todos, setTodos, removeTodo, editTodo,
  } = useContext(TodosContext);

  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleRemoveTodo = () => {
    removeTodo(todo.id);
  };

  const handleToggleCompleted = () => {
    const updatedTodos = todos.map(item => {
      if (item.id === todo.id) {
        return { ...item, completed: !item.completed };
      }

      return item;
    });

    setTodos(updatedTodos);
  };

  const handleEditTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleSave = () => {
    if (editedTitle.trim() !== '' && editedTitle !== todo.title) {
      editTodo(todo.id, editedTitle);
    } else {
      setEditedTitle(todo.title);
    }

    setIsEditing(false);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSave();
    } else if (event.key === 'Escape') {
      setEditedTitle(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <>
      <li
        className={`${isEditing ? 'editing' : ''} ${todo.completed ? 'completed' : ''}`}
      >
        <div>
          <input
            type="checkbox"
            className="toggle"
            id="toggle-completed"
            checked={todo.completed}
            onChange={handleToggleCompleted}
          />

          {isEditing ? (
            <input
              type="text"
              className="edit"
              value={editedTitle}
              onChange={handleEditTodo}
              onBlur={handleSave}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
          ) : (

            <>
              <label onDoubleClick={handleDoubleClick}>{todo.title}</label>
              <button
                type="button"
                className="destroy"
                data-cy="deleteTodo"
                onClick={handleRemoveTodo}
              />
            </>
          )}

        </div>

      </li>
    </>
  );
};
