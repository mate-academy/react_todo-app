/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../../context/TodoContext';

type TodoItemProps = {
  todo: Todo;
};

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { title, completed, id } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const todoContext = useContext(TodoContext);

  const { toggleTodo, deleteTodo, updateTodoTitle } = todoContext;

  const handleToggleTodo = () => {
    toggleTodo(id);
  };

  const handleDeleteTodo = () => {
    deleteTodo(id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleEditSubmit = () => {
    const trimmedTitle = editedTitle.trim();

    if (trimmedTitle !== '') {
      setEditedTitle(trimmedTitle);
      setIsEditing(false);
      updateTodoTitle(id, trimmedTitle);
    } else {
      deleteTodo(id);
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditedTitle(title);
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleEditSubmit();
    } else if (event.key === 'Escape') {
      handleEditCancel();
    }
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <li className={cn({
      completed,
      editing: isEditing,
    })}
    >
      {!isEditing ? (
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={`toggle-${id}`}
            checked={completed}
            onChange={handleToggleTodo}
          />
          <label onDoubleClick={handleEdit}>{title}</label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={handleDeleteTodo}
          />
        </div>
      )
        : (
          <input
            type="text"
            ref={inputRef}
            className="edit"
            value={editedTitle}
            placeholder="Empty todo will be deleted"
            onChange={handleEditChange}
            onBlur={handleEditSubmit}
            onKeyUp={handleKeyUp}
          />
        )}
    </li>
  );
};
