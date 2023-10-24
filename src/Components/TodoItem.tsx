import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { TodosContext } from '../TodosContext';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, completed, id } = todo;
  const {
    changeStatus,
    deleteTodo,
    changeTitle,
  } = useContext(TodosContext);

  const [changedTitle, setChangedTitle] = useState(title);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(editingId === id);
  const input = useRef<HTMLInputElement | null>(null);

  const updateTodoTitle = () => {
    const trimmedTitle = changedTitle.trim();

    if (trimmedTitle) {
      setChangedTitle(trimmedTitle);
      setIsEditing(false);
      changeTitle(id, trimmedTitle);
    } else {
      deleteTodo(id);
    }
  };

  const handlechangeStatus = () => {
    changeStatus(id);
  };

  const handleEditing = () => {
    setIsEditing(true);
    setEditingId(id);
  };

  const handleDeleteTodo = () => {
    deleteTodo(id);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setChangedTitle(title);
    setEditingId(null);
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangedTitle(e.target.value);
  };

  const handlekeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      updateTodoTitle();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  useEffect(() => {
    if (editingId === id && input.current) {
      input.current.focus();
    }
  }, [isEditing, editingId, id]);

  useEffect(() => {
    if (!isEditing) {
      setEditingId(null);
    }
  }, [isEditing]);

  return (
    <li className={classNames({
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
            onChange={handlechangeStatus}
          />
          <label
            onDoubleClick={handleEditing}
          >
            {title}
          </label>
          {/* eslint-disable-next-line */}
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
            className="edit"
            value={changedTitle}
            onChange={handleChangeTitle}
            onKeyUp={handlekeyUp}
            onBlur={updateTodoTitle}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
        )}
    </li>
  );
};
