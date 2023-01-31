/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import {
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  handleDelete: (id: number) => void;
  handleStatusChange: (id: number) => void;
  handleEditing: (
    updatedTitle: string,
    id: number,
    callback: (arg: boolean) => void,
  ) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  handleDelete,
  handleStatusChange,
  handleEditing,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const titleInputField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleInputField.current) {
      titleInputField.current.focus();
    }
  });

  const handleKeypress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditing(newTitle, todo.id, setIsEditing);
    }

    if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <li className={classNames(
      {
        completed: todo.completed,
        editing: isEditing,
      },
    )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => handleStatusChange(todo.id)}
        />

        <label
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleDelete(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitle}
        ref={titleInputField}
        onChange={(e) => setNewTitle(e.target.value)}
        onKeyDown={handleKeypress}
        onBlur={() => handleEditing(newTitle, todo.id, setIsEditing)}
      />
    </li>
  );
};
