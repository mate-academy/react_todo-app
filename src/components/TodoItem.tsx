import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../utils/utils';

interface TodoItemProps {
  todo: Todo;
  onDelete: (todo: Todo) => void;
  onComplete: (todo: Todo) => void;
  onTitleUpdate: (todo: Todo, newTitle: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onDelete,
  onComplete,
  onTitleUpdate,
}) => {
  const [onEdit, setOnEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [previousTitle, setPreviousTitle] = useState('');
  const editRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (newTitle.trim() !== '') {
      onTitleUpdate(todo, newTitle);
    } else {
      setNewTitle(previousTitle);
    }

    setOnEdit(false);
  };

  const handleDoubleClick = () => {
    setOnEdit(true);
    setPreviousTitle(newTitle);
  };

  const handleKeyUp = useCallback((
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      handleSubmit();
    } else if (event.key === 'Escape') {
      setNewTitle(previousTitle);
      setOnEdit(false);
    }
  }, [previousTitle, newTitle]);

  useEffect(() => {
    if (onEdit && editRef.current) {
      editRef.current.focus();
    }
  }, [onEdit]);

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: onEdit,
      })}
      onDoubleClick={handleDoubleClick}
    >
      {onEdit ? (
        <input
          value={newTitle}
          onChange={(event) => setNewTitle(event.currentTarget.value)}
          onBlur={handleSubmit}
          onKeyUp={(event) => handleKeyUp(event)}
          type="text"
          className="edit"
          ref={editRef}
        />
      ) : (
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id="toggle-view"
            checked={todo.completed}
            onChange={() => onComplete(todo)}
          />

          <label>{newTitle}</label>

          <button
            onClick={() => onDelete(todo)}
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            aria-label="Delete Todo"
          />
        </div>
      )}
    </li>
  );
};
