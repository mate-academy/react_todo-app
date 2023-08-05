import {
  FC, useState, useEffect, useRef,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../types';
import { useTodoContext } from '../hooks/useTodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: FC<Props> = ({ todo }) => {
  const {
    handleToggleTodoStatus,
    handleUpdateTodoTitle,
    onDeleteTodo,
  } = useTodoContext();

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const editRef = useRef<HTMLInputElement>(null);

  const handleEditTodoTitle = (
    event?: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (!event || event.key === 'Enter') {
      handleUpdateTodoTitle(todo, newTitle);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    const cancelEditing = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsEditing(false);
      }
    };

    document.addEventListener('keyup', cancelEditing);

    return () => {
      document.removeEventListener('keyup', cancelEditing);
    };
  }, []);

  useEffect(() => {
    setNewTitle(todo.title);

    if (isEditing && editRef.current) {
      editRef.current.focus();
    }
  }, [isEditing]);

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={() => handleToggleTodoStatus(todo)}
        />

        <label
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </label>

        {/* eslint-disable-next-line */}
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onDeleteTodo(todo.id)}
        />
      </div>

      {isEditing && (
        <input
          ref={editRef}
          type="text"
          className="edit"
          value={newTitle}
          onBlur={() => handleEditTodoTitle()}
          onKeyDown={handleEditTodoTitle}
          onChange={(event) => setNewTitle(event.target.value)}
        />
      )}
    </li>
  );
};
