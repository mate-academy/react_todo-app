/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  onTodoCompletion: (todoId: number) => void,
  onTodoRemoving: (todoId: number) => void,
  onTodoEditing: (todoId: number, title: string) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onTodoCompletion,
  onTodoRemoving,
  onTodoEditing,
}) => {
  const { id, title, completed } = todo;

  const [isEditing, setIsEditing] = useState(false);
  const [changedTitle, setChangedTitle] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const handleTodoCompletion = () => {
    onTodoCompletion(id);
  };

  const handleEditing = () => {
    setIsEditing(true);
  };

  const handleTodoRemoving = () => {
    onTodoRemoving(id);
  };

  const handleTitleChanging = (e:React.ChangeEvent<HTMLInputElement>) => {
    setChangedTitle(e.target.value);
  };

  const handleTitleSubmitting = () => {
    if (changedTitle === title) {
      setIsEditing(false);
    } else if (!changedTitle.trim()) {
      onTodoRemoving(id);
      // setIsEditing(false);
    } else {
      onTodoEditing(id, changedTitle);
      setIsEditing(false);
    }
  };

  const handleTitleCancelation = () => {
    setIsEditing(false);
    setChangedTitle(title);
  };

  const handleKeyboardEvent = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') {
      handleTitleSubmitting();
    } else if (e.code === 'Escape') {
      handleTitleCancelation();
    }
  };

  return (
    <>
      <li
        className={classNames(
          { completed },
          { editing: isEditing },
        )}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id="toggle-view"
            checked={completed}
            onChange={handleTodoCompletion}
          />

          <label
            onDoubleClick={handleEditing}
          >
            {title}
          </label>

          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            aria-label="destroy"
            onClick={handleTodoRemoving}
          />
        </div>
        <input
          type="text"
          className="edit"
          value={changedTitle}
          onChange={handleTitleChanging}
          onBlur={handleTitleSubmitting}
          onKeyUp={handleKeyboardEvent}
          ref={inputRef}
        />
      </li>
    </>
  );
};
