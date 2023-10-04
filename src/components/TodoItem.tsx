/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TodoListContext } from '../context/TodoListContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({
  todo,
}) => {
  const { id, title, completed } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    handleCompleted,
    handleDeletedTodo,
    handleTodoRename,
  } = useContext(TodoListContext);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleDubleClick = () => {
    setIsEditing(true);
  };

  const isBlurInput = (event: React.FormEvent) => {
    event.preventDefault();

    if (newTitle !== title) {
      handleTodoRename(newTitle, id);
      setIsEditing(false);
    }

    if (!newTitle.trim()) {
      handleDeletedTodo(id);
    }

    setIsEditing(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const keyUp = (event: { key: string }) => {
    switch (event.key) {
      case 'Enter':
        handleTodoRename(newTitle, id);
        break;

      case 'Escape':
        setNewTitle(title);
        setIsEditing(false);
        break;

      default: break;
    }
  };

  return (
    <li
      className={classNames({
        completed,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          id={`${id}`}
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={() => handleCompleted(id)}
        />
        <label
          htmlFor={`${id}`}
          onDoubleClick={handleDubleClick}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleDeletedTodo(id)}
        />
      </div>

      <form onSubmit={isBlurInput}>
        <input
          name="rename-todo"
          ref={inputRef}
          type="text"
          className="edit"
          value={newTitle}
          onKeyUp={keyUp}
          onChange={handleChange}
          onBlur={isBlurInput}
        />

      </form>
    </li>
  );
};
