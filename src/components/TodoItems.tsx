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

export const TodoItems: React.FC<Props> = ({ todo }) => {
  const todoContext = useContext(TodosContext);

  const { title, completed, id } = todo;

  const { deleteTodo, toggleSelectedTodo, changeSelectedTodo } = todoContext;

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(title);

  const handleDeleteTodo = () => {
    deleteTodo(id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleToggleTodo = () => {
    toggleSelectedTodo(id);
  };

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(event.target.value);
  };

  const handleEditSubmit = () => {
    const trimmedText = editedText.trim();

    if (trimmedText !== '') {
      setEditedText(trimmedText);
      setIsEditing(false);
      changeSelectedTodo(id, trimmedText);
    } else {
      deleteTodo(id);
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditedText(title);
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
          type="title"
          ref={inputField}
          className="edit"
          value={editedText}
          placeholder="Empty todo will be deleted"
          onChange={handleEditChange}
          onBlur={handleEditSubmit}
          onKeyUp={handleKeyUp}
        />
      )}
    </li>
  );
};
