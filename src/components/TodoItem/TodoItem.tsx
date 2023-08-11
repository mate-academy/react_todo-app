/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../context/TodoContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, completed, id } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const todoContext = useContext(TodosContext);

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
    } else {
      deleteTodo(id);
    }

    updateTodoTitle(id, trimmedTitle);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleEditSubmit();
    } else if (event.key === 'Escape') {
      handleEditCancel();
    }
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  // to focus on the form field right after loading todo
  useEffect(() => {
    if (!isEditing && inputRef.current) {
      inputRef.current.focus();
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
      ) : (
        <input
          type="text"
          ref={inputRef}
          className="edit"
          value={editedTitle}
          onChange={handleEditChange}
          onBlur={handleEditSubmit}
          onKeyUp={handleKeyUp}
        />
      )}
    </li>
  );
};
