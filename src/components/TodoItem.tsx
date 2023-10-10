import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { TodosContext } from './TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, completed, id } = todo;

  const todoContext = useContext(TodosContext);
  const { toggleTodo, deleteTodo, editingTodo } = todoContext;

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

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
      editingTodo(id, trimmedTitle);
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

  const inputField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputField.current) {
      inputField.current.focus();
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

          <label onDoubleClick={handleEdit}>
            {title}
          </label>

          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            aria-label="deleteTodo"
            onClick={handleDeleteTodo}
          />
        </div>
      ) : (
        <input
          type="text"
          ref={inputField}
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
