/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import classNames from 'classnames';
import { useTodoContext } from '../../store/TodoContext';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({
  todo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [todoTitle, setTodoTitle] = useState(todo.title);

  const {
    deleteTodo,
    handleTodoUpdate,
    handleStatusChange,
  } = useTodoContext();

  const inputEdit = useRef<HTMLInputElement | null>(null);

  const {
    id,
    title,
    completed,
  } = todo;

  const handleTodoDelete = () => {
    deleteTodo(id);
  };

  const handleStatusToggle = () => {
    handleStatusChange(todo);
  };

  const handleTodoDoubleClick = () => {
    setIsEditing(true);
  };

  const handleTodoTitleChange = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    setTodoTitle(event.target.value);
  };

  const handleTodoSave = () => {
    const trimmedTodoTitle = todoTitle.trim();

    if (trimmedTodoTitle === title) {
      setTodoTitle(trimmedTodoTitle);
      setIsEditing(false);

      return;
    }

    if (trimmedTodoTitle) {
      setTodoTitle(trimmedTodoTitle);
      handleTodoUpdate(todo, trimmedTodoTitle);
    } else {
      handleTodoDelete();
    }

    setIsEditing(false);
  };

  const handleKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
      setTodoTitle(title);
    }

    if (event.key === 'Enter') {
      setIsEditing(false);
      handleTodoSave();
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputEdit.current?.focus();
    }
  }, [isEditing]);

  return (
    <li
      className={classNames({
        editing: isEditing,
        completed,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={handleStatusToggle}
        />

        <label
          onDoubleClick={handleTodoDoubleClick}
        >
          {title}
        </label>

        <button
          type="button"
          className="destroy"
          onClick={handleTodoDelete}
          data-cy="deleteTodo"
        />
      </div>

      <input
        type="text"
        className="edit"
        value={todoTitle}
        onChange={handleTodoTitleChange}
        onKeyUp={handleKeyUp}
        onBlur={handleTodoSave}
        ref={inputEdit}
      />

    </li>
  );
};
