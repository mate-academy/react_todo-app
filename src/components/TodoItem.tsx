import {
  useEffect, useState, useRef, useContext,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TodosContext } from '../store/TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({
  todo: { id, title, completed },
}) => {
  const { deleteTodo, updateTodos } = useContext(TodosContext);
  const [newTitle, setNewTitle] = useState<string>(title);
  const [isEditing, setIsEditing] = useState(false);
  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, [isEditing]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const saveChanges = () => {
    setIsEditing(false);
    switch (true) {
      case newTitle === '':
        deleteTodo(id);
        break;
      case newTitle !== title:
        updateTodos(id, { title: newTitle });
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
      setNewTitle(title);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      saveChanges();
    }
  };

  const handleComplete = () => updateTodos(id, { completed: !completed });

  return (
    <li
      className={classNames({
        completed,
        editing: isEditing,
      })}
    >
      {isEditing ? (
        <input
          type="text"
          className="edit"
          ref={titleField}
          value={newTitle}
          onChange={handleTitleChange}
          onBlur={saveChanges}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id="toggle-view"
            checked={completed}
            onChange={handleComplete}
          />
          <label
            onDoubleClick={() => setIsEditing(true)}
          >
            {title}
          </label>
          <button
            aria-label="Destroy Button"
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => deleteTodo(id)}
          />
        </div>
      )}
    </li>
  );
};
