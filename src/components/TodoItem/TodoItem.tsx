/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import {
  useEffect,
  useRef,
  useState,
} from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  handleTodoDelete: (id: number) => void;
  handleStatusToggle: (id: number) => void;
  handleTodoEditing: (
    updatedTitle: string,
    id: number,
    callback: (arg: boolean) => void,
  ) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  handleTodoDelete,
  handleStatusToggle,
  handleTodoEditing,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const inputField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputField.current) {
      inputField.current.focus();
    }
  });

  const handleKeypress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleTodoEditing(newTitle, todo.id, setIsEditing);
    }

    if (event.key === 'Escape') {
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
          onChange={() => handleStatusToggle(todo.id)}
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
          onClick={() => handleTodoDelete(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitle}
        ref={inputField}
        onChange={(event) => setNewTitle(event.target.value)}
        onKeyDown={handleKeypress}
        onBlur={() => handleTodoEditing(newTitle, todo.id, setIsEditing)}
      />
    </li>
  );
};
