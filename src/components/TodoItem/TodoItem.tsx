import {
  useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { TodoItemProps } from '../../types';
import { TodosContext } from '../TodosContext/TodosContext';

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo, editTodoTitle } = useContext(TodosContext);
  const { id, title, completed } = todo;

  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleBlur = () => {
    if (!editedTitle.trim()) {
      deleteTodo(id);
    } else {
      setEditedTitle(editedTitle.trim());
      editTodoTitle(id, editedTitle.trim());
      setEditing(false);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEditedTitle(title);
      setEditing(false);
    }

    if (event.key === 'Enter') {
      event.preventDefault();

      handleBlur();
    }
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleToggleTodo = () => {
    toggleTodo(id);
  };

  const handleDeleteTodo = () => {
    deleteTodo(id);
  };

  return (
    <li className={classNames({
      completed,
      editing,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={handleToggleTodo}
        />

        <label onDoubleClick={() => setEditing(true)}>
          {todo.title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Delete"
          onClick={handleDeleteTodo}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={inputRef}
        value={editedTitle}
        onChange={handleEditChange}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
      />
    </li>
  );
};
