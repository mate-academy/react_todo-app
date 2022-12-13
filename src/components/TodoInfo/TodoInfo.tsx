import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  togleStatus: (
    id: number,
    completed: boolean) => void;
  deleteTodo: (id: number) => void;
  changeInputText: (id: number, query: string) => void;
};

enum ButtonKey {
  enter = 'Enter',
  escape = 'Escape',
}

export const TodoInfo: React.FC<Props> = ({
  todo,
  togleStatus,
  deleteTodo,
  changeInputText,
}) => {
  const {
    title,
    completed,
    id,
  } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [query, setQuery] = useState(title);

  const handleDoubleClick = () => setIsEditing(prevState => !prevState);
  const handleButtonClick = () => deleteTodo(id);
  const handleStatusChange = () => togleStatus(id, completed);

  const handleTodoEdit = (event: React.KeyboardEvent<HTMLInputElement>) => (
    setQuery(event.target.value)
  );

  const handleInputChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case ButtonKey.enter:
        setIsEditing(false);
        setQuery(event.target.value);
        if (!query) {
          deleteTodo(id);

          return;
        }

        changeInputText(id, query);
        break;

      case ButtonKey.escape:
        setIsEditing(false);
        setQuery(title);
        break;

      default:
        break;
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    setIsEditing(false);

    if (!query) {
      deleteTodo(id);

      return;
    }

    setQuery(event.target.value);
    changeInputText(id, query);
  };

  return (
    <li
      key={todo.id}
      className={classNames(
        { completed },
        { editing: isEditing },
      )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={handleStatusChange}
          checked={completed}
        />
        <label
          onDoubleClick={handleDoubleClick}
        >
          {title}
        </label>
        <button
          type="button"
          aria-label="destroy"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleButtonClick}
        />
      </div>
      <input
        type="text"
        className="edit"
        defaultValue={title}
        value={query}
        onChange={handleTodoEdit}
        onBlur={handleBlur}
        onKeyDown={handleInputChange}
        placeholder="Empty todo will be deleted"
      />
    </li>
  );
};
